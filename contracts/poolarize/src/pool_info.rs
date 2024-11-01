use crate::{util::constants::*, util::proportional, PoolMate};
use near_sdk::{
    borsh::{self, BorshDeserialize, BorshSerialize},
    env,
    json_types::U128,
    log, near_bindgen,
    serde::{Deserialize, Serialize},
    AccountId, Balance, PanicOnDefault,
};

#[derive(PartialEq)]
enum ModeAddOrRemove {
    Add,
    Remove,
}

#[near_bindgen]
#[derive(Deserialize, Serialize, PanicOnDefault)]
#[serde(crate = "near_sdk::serde")]
pub struct PoolInfoJson {
    pub token_contract: String,
    pub token_balance: U128, // virtual base (except for the main token)
    pub usd_reserve: U128,   // in all pairs quote is virtual usd
    pub enabled: bool,
    pub token_symbol: String,
    pub token_name: String,
    pub token_decimals: u8, // need to know this to normalize token amounts
    pub total_real_tokens_deposited: U128, // depends on token_decimals, user-deposited tokens
    pub total_real_owner_tokens_withdrawn: U128, // depends on token_decimals, owner-withdrawn tokens
    pub oracle_price_timestamp_ms: u64,
    pub oracle_price: U128, // 24 decimals
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct PoolInfo {
    pub enabled: bool,
    pub token_contract: AccountId,
    pub token_symbol: String,
    pub token_name: String,
    pub token_decimals: u8,  // need to know this to normalize token amounts
    pub token_balance: u128, // virtual, depends on token_decimals (real tokens only in the main pool)
    pub usd_reserve: u128,   // virtual, 24 decimals
    pub total_real_tokens_deposited: u128, // real user-deposited tokens, depends on token_decimals
    pub total_real_owner_tokens_withdrawn: u128, // real owner-withdrawn tokens, depends on token_decimals
    oracle_price_timestamp_ms: u64,
    oracle_price: u128, // 24 decimals
}

impl PoolInfo {
    pub fn new(name: String, symbol: String, contract: &AccountId, decimals: u8) -> Self {
        log!("crating {}/usd {} decimals {}", symbol, contract, decimals);
        Self {
            enabled: false,
            token_name: name,
            token_symbol: symbol,
            token_contract: contract.clone(),
            usd_reserve: 0,
            token_balance: 0,
            token_decimals: decimals,
            total_real_tokens_deposited: 0,
            total_real_owner_tokens_withdrawn: 0,
            oracle_price_timestamp_ms: 0,
            oracle_price: 0,
        }
    }

    pub fn is_empty(&self) -> bool {
        !self.enabled && self.usd_reserve == 0 && self.token_balance == 0
    }

    pub fn check_is_empty(&self) {
        assert!(self.is_empty(), "pool is not empty");
    }

    pub fn to_json(&self) -> PoolInfoJson {
        PoolInfoJson {
            token_contract: self.token_contract.to_string(),
            usd_reserve: self.usd_reserve.into(),
            token_balance: self.token_balance.into(),
            enabled: self.enabled,
            token_symbol: self.token_symbol.clone(),
            token_name: self.token_name.clone(),
            token_decimals: self.token_decimals,
            total_real_tokens_deposited: self.total_real_tokens_deposited.into(),
            total_real_owner_tokens_withdrawn: self.total_real_owner_tokens_withdrawn.into(),
            oracle_price_timestamp_ms: self.oracle_price_timestamp_ms,
            oracle_price: self.oracle_price.into(),
        }
    }

    pub fn normalized_total_tokens(&self) -> u128 {
        self.normalize_to_24dec(self.token_balance)
    }

    const VALID_ORACLE_PRICE_TIME_MS: u64 = 15 * 60 * 1000;
    /// oracle prices are valid for 15 minutes
    pub fn is_oracle_price_valid(&self) -> bool {
        self.oracle_price_timestamp_ms + Self::VALID_ORACLE_PRICE_TIME_MS
            > env::block_timestamp_ms()
    }

    pub fn get_oracle_price(&self) -> Option<u128> {
        if self.is_oracle_price_valid() && self.oracle_price != 0 {
            Some(self.oracle_price)
        } else {
            None
        }
    }

    pub fn spot_price_usd(&self) -> Option<u128> {
        if self.usd_reserve == 0 || self.token_balance == 0 {
            // no deposits yet, use oracle price
            self.get_oracle_price()
        } else {
            let total_tokens_normalized = self.normalized_total_tokens();
            // get spot price (in 24 dec) total_usd/total_tokens
            Some(proportional(E24, self.usd_reserve, total_tokens_normalized))
        }
    }

    // normalize token amount to 24 decimals
    pub fn normalize_to_24dec(&self, token_amount: Balance) -> Balance {
        proportional(token_amount, E24, 10_u128.pow(self.token_decimals as u32))
    }

    // normalize token amount to the right amount of decimals
    pub fn denormalize_token_amount(&self, token_amount_e24: Balance) -> Balance {
        proportional(
            token_amount_e24,
            10_u128.pow(self.token_decimals as u32),
            E24,
        )
    }

    pub fn compute_usd_output(&self, input_token_amount: u128) -> u128 {
        // constant is k on x * y = k, where x=token1, y=token2 in the pool
        // compute the output amount of token y the user will get if input = ax, while keeping k = x*y
        // formula =>  output_x = a * (y / (x + a)), so the price of y/x is computed on the input token PLUS the input amount
        let usd_reserve = self.usd_reserve; // quote is always usd
        let token_balance = self.normalized_total_tokens(); // normalized total token amount to 24 decimals
        let input_token_normalized = self.normalize_to_24dec(input_token_amount); // normalize token amount to 24 decimals
        log!(
            "token_balance {}, usd_reserve_usd:{} input_token:{}",
            token_balance,
            usd_reserve,
            input_token_normalized
        );
        proportional(
            input_token_normalized,
            usd_reserve,
            token_balance + input_token_normalized,
        )
    }

    pub fn compute_token_output(&self, input_usd_amount: u128) -> u128 {
        // constant is k on x * y = k, where x=token1, y=token2 in the pool
        // compute the output amount of token y the user will get if input = ax, while keeping k = x*y
        // formula =>  output_x = a * (y / (x + a)), so the price of y/x is computed on the input token PLUS the input amount
        let usd_reserve = self.usd_reserve; // quote is always usd
        let token_balance = self.normalized_total_tokens(); // normalized total token amount to 24 decimals
        log!(
            "usd_reserve:{} token_balance:{} input_usd_amount:{}",
            token_balance,
            usd_reserve,
            input_usd_amount
        );
        self.denormalize_token_amount(proportional(
            input_usd_amount,
            token_balance,
            usd_reserve + input_usd_amount,
        ))
    }

    // in a pool, a real token balance increases, usd balance in that pool decreases
    pub fn extract_usd(&mut self, amount_input_token: u128, amount_output_usd: u128) {
        self.usd_reserve -= amount_output_usd;
        self.token_balance += amount_input_token;
    }
    // undo prev operation
    pub fn undo_extract_usd(&mut self, amount_input_token: u128, amount_output_usd: u128) {
        self.usd_reserve += amount_output_usd;
        self.token_balance -= amount_input_token;
    }

    // in the main pool, a real token balance decreases, usd balance in that pool increases
    pub fn extract_token(&mut self, amount_input_usd: u128, amount_output_token: u128) {
        self.usd_reserve += amount_input_usd;
        self.token_balance -= amount_output_token;
    }
    // undo prev operation
    pub fn undo_extract_token(&mut self, amount_input_usd: u128, amount_output_token: u128) {
        self.usd_reserve -= amount_input_usd;
        self.token_balance += amount_output_token;
    }

    /// returns usd added/removed
    fn add_or_remove_token_no_price_change(
        &mut self,
        token_amount: u128,
        mode: ModeAddOrRemove,
    ) -> (u128, u128) {
        let spot_price_usd = self.spot_price_usd().expect(&format!(
            "{}/usd price is not valid. Set oracle price before operating {}",
            &self.token_symbol, &self.token_contract
        ));

        let normalized_deposit_amount = self.normalize_to_24dec(token_amount);
        let usd_to_add = proportional(normalized_deposit_amount, spot_price_usd, E24);
        log!(
            "token-{} no-price-change +{} {} / +{} usd",
            if mode == ModeAddOrRemove::Remove {
                "remove"
            } else {
                "add"
            },
            token_amount,
            self.token_symbol,
            usd_to_add
        );
        if mode == ModeAddOrRemove::Remove {
            self.token_balance -= token_amount;
            self.usd_reserve -= usd_to_add;
        } else {
            self.token_balance += token_amount;
            self.usd_reserve += usd_to_add;
        }
        (usd_to_add, spot_price_usd)
    }

    /// reduce token liquidity without affecting price (returns usd amount, spot_price_usd)
    pub fn add_token_liquidity_no_price_change(
        &mut self,
        token_amount_to_add: u128,
    ) -> (u128, u128) {
        self.add_or_remove_token_no_price_change(token_amount_to_add, ModeAddOrRemove::Add)
    }

    /// increase token liquidity without affecting price (returns usd amount, spot_price_usd)
    pub fn remove_token_liquidity_no_price_change(
        &mut self,
        token_amount_to_remove: u128,
    ) -> (u128, u128) {
        self.add_or_remove_token_no_price_change(token_amount_to_remove, ModeAddOrRemove::Remove)
    }

    pub fn set_oracle_price(&mut self, price_usd: u128) {
        self.oracle_price = price_usd;
        self.oracle_price_timestamp_ms = env::block_timestamp_ms();
    }

    pub fn save(&self, main: &mut PoolMate) {
        main.pools.insert(&self.token_contract, self);
    }
}
