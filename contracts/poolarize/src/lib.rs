use crate::util::{constants::*, interface::*};
use near_contract_standards::fungible_token::metadata::FungibleTokenMetadata;
use near_sdk::{
    assert_one_yocto,
    borsh::{self, BorshDeserialize, BorshSerialize},
    collections::UnorderedMap,
    env,
    json_types::U128,
    log, near_bindgen, AccountId, PanicOnDefault, PromiseResult,
};
use pool_info::{PoolInfo, PoolInfoJson};

mod deposit;
mod internal;
mod pool_info;
mod util;
mod withdraw;
mod oracle;

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct PoolMate {
    // Contract Owner
    pub owner_id: AccountId,
    // Contract Operator
    pub operator_id: AccountId,
    // main token contract account id
    pub main_token_address: AccountId,
    // if sending the main-token to the user fails
    pub user_incomplete_main_token_transfers: UnorderedMap<AccountId, u128>,
    // pools where the quote is always usd
    pub pools: UnorderedMap<AccountId, PoolInfo>,
}

#[near_bindgen]
impl PoolMate {
    #[init]
    pub fn new(owner_id: AccountId, operator_id: AccountId, main_token_address: AccountId) -> Self {
        assert!(!env::state_exists(), "The contract is already initialized");
        Self {
            owner_id,
            operator_id,
            main_token_address,
            user_incomplete_main_token_transfers: UnorderedMap::new(
                Keys::IncompleteMainTokenTransfers,
            ),
            pools: UnorderedMap::new(Keys::Pools),
        }
    }

    // after adding, owner must send tokens to the pool, and after that ENABLE the pool
    #[payable]
    pub fn add_pool(&mut self, token_contract: &AccountId) {
        self.assert_owner();
        assert_one_yocto();
        if self.pools.get(&token_contract).is_some() {
            panic!("{}/usd already in the pools", token_contract);
        }
        // manage native coin differently (it is not a NEP-141)
        if token_contract.as_str().eq(NEAR_PSEUDO_TOKEN) {
            self.pools.insert(
                &token_contract,
                &PoolInfo::new(
                    NEAR_PSEUDO_TOKEN.into(),
                    NEAR_PSEUDO_TOKEN.into(),
                    token_contract,
                    24,
                ),
            );
        } else {
            // call ft_metadata to get decimals
            ext_ft::ext(token_contract.clone())
                .with_static_gas(GAS_FOR_FT_TRANSFER)
                .ft_metadata()
                .then(
                    Self::ext(env::current_account_id())
                        .with_static_gas(GAS_FOR_RESOLVE_FT_TRANSFER)
                        .callback_ft_metadata(token_contract),
                );
        }
    }

    // prev fn continues here. Read ft_contract metadata
    #[private]
    pub fn callback_ft_metadata(&mut self, token_contract: &AccountId) {
        match env::promise_result(0) {
            PromiseResult::NotReady => unreachable!(),

            PromiseResult::Successful(value) => {
                if let Ok(ft_metadata) =
                    near_sdk::serde_json::from_slice::<FungibleTokenMetadata>(&value)
                {
                    // correct FungibleTokenMetadata received
                    self.pools.insert(
                        &token_contract,
                        &PoolInfo::new(
                            ft_metadata.name,
                            ft_metadata.symbol,
                            token_contract,
                            ft_metadata.decimals,
                        ),
                    );
                } else {
                    // promise ok but no result? -- should not happen
                    log!("UNEXPECTED ERROR: promise ok but no result!");
                }
            }

            PromiseResult::Failed => {
                panic!("Invalid ft contract address {}", token_contract);
            }
        };
    }

    // gets pool or panics
    pub(crate) fn get_pool(&self, token_contract: &AccountId) -> PoolInfo {
        self.pools
            .get(&token_contract)
            .unwrap_or_else(|| panic!("non-existent pool {}", token_contract))
    }

    // gets main pool or panics
    pub(crate) fn get_main_pool(&self) -> PoolInfo {
        self.get_pool(&self.main_token_address)
    }

    pub fn remove_pool(&mut self, token_contract: &AccountId) {
        self.assert_owner();
        let pool = self.get_pool(token_contract);
        pool.check_is_empty();
        self.pools.remove(&token_contract);
        log!("{} pool removed", token_contract);
    }

    pub fn get_pool_info(&self, token_contract: &AccountId) -> PoolInfoJson {
        self.get_pool(&token_contract).to_json()
    }

    pub fn get_pools(self) -> Vec<PoolInfoJson> {
        self.pools
            .iter()
            .map(|tuple| tuple.1.to_json())
            .collect()
    }

    #[payable]
    /// returns (usd added, spot_price_usd 24dec)
    pub fn add_liquidity(
        &mut self,
        token_contract: &AccountId,
        amount_token: U128, // depends on main-token decimals
    ) -> (U128, U128) {
        assert_one_yocto();
        self.assert_signer_owner_or_operator();
        // verify is not the main_pool
        if token_contract.eq(&self.main_token_address) {
            panic!(
                "to add liquidity to the main pool do {}.ft_transfer_call(receiver_id:{})",
                self.main_token_address,
                env::current_account_id()
            );
        }
        let mut pool = self.get_pool(&token_contract);
        let result = pool.add_token_liquidity_no_price_change(amount_token.0);
        pool.save(self);
        (result.0.into(), result.1.into())
    }

    #[payable]
    /// returns (usd removed, spot_price_usd 24dec)
    pub fn remove_liquidity(
        &mut self,
        token_contract: &AccountId,
        amount_token: U128, // depends on main-token decimals
    ) -> (U128, U128) {
        // returns (usd added, spot_price_usd 24dec)
        assert_one_yocto();
        self.assert_signer_owner_or_operator();
        // verify is not the main_pool
        if token_contract.eq(&self.main_token_address) {
            panic!("to remove liquidity from the main pool use owner_withdraw()");
        }
        let mut pool = self.get_pool(&token_contract);
        let result = pool.remove_token_liquidity_no_price_change(amount_token.0);
        pool.save(self);
        (result.0.into(), result.1.into())
    }

    // how much token units will x usd buy
    // uses the AMM constant k=x*y,
    // so the effective price is higher the more units of token_contract delivered
    pub fn compute_token_output(&self, usd_amount: U128, token_contract: &AccountId) -> U128 {
        self.get_pool(&token_contract)
            .compute_token_output(usd_amount.0)
            .into()
    }
    // how much usd x units of token_contract will buy
    // uses the AMM constant k=x*y,
    // so the effective price is higher the more units of token_contract delivered
    pub fn compute_usd_output(&self, token_contract: &AccountId, token_amount: U128) -> U128 {
        self.get_pool(&token_contract)
            .compute_usd_output(token_amount.0)
            .into()
    }

    // how much main-tokens will x other-token buy
    // uses 2-steps with the other-token/usd and main-token/usd
    // main-token/usd price becomes higher the more units of main token delivered
    // other-token/usd price becomes lower the more units of the token are received
    pub fn compute_token_output_2_step(
        &self,
        input_token_amount: U128,
        input_token_contract: &AccountId,
    ) -> U128 {
        let intermediate_usd = self
            .get_pool(&input_token_contract)
            .compute_usd_output(input_token_amount.0);
        let main_pool = self.get_main_pool();
        main_pool.compute_token_output(intermediate_usd).into()
    }

    // compute spot price as token/usd (without considering the amount the user removes)
    // returns a u128 with 24 decimals
    pub fn spot_price_usd(&self, token_contract: &AccountId) -> U128 {
        let pool = self.get_pool(token_contract);
        pool.spot_price_usd().unwrap().into()
    }

    // owner enables a pool
    #[payable]
    pub fn enable_pool(&mut self, token_contract: &AccountId) {
        assert_one_yocto();
        self.assert_owner();
        let mut pool = self.get_pool(token_contract);
        if pool.token_balance == 0 || pool.usd_reserve == 0 {
            panic!("pool token balance or usd_reserve are zero. add liquidity first")
        }
        pool.enabled = true;
        pool.save(self);
    }
    #[payable]
    pub fn disable_pool(&mut self, token_contract: &AccountId) {
        assert_one_yocto();
        self.assert_owner();
        let mut pool = self.get_pool(token_contract);
        pool.enabled = false;
        pool.save(self);
    }

}
