use crate::{
    util::{constants::*, interface::*},
    PoolMate, PoolMateExt,
};
use near_sdk::{
    assert_one_yocto, env, json_types::U128, log, near_bindgen, AccountId, Promise, PromiseResult,
};

#[near_bindgen]
impl PoolMate {
    // owner withdraws from real balances
    #[payable]
    pub fn owner_withdraw(
        &mut self,
        token_contract: &AccountId,
        token_amount_to_withdraw: U128,
    ) -> Promise {
        self.assert_owner();
        assert_one_yocto();
        let mut pool = self.get_pool(token_contract);
        let tokens_available =
            pool.total_real_tokens_deposited - pool.total_real_owner_tokens_withdrawn;
        assert!(
            tokens_available >= token_amount_to_withdraw.0,
            "not enough available tokens {} {}",
            tokens_available,
            pool.token_symbol
        );
        pool.total_real_owner_tokens_withdrawn += token_amount_to_withdraw.0;
        // if it is the main pool, reduce liquidity without altering the price
        let (usd_amount, _spot_price) = if token_contract.eq(&self.main_token_address) {
            // it is the main token
            // withdrawing also reduces liquidity
            pool.remove_token_liquidity_no_price_change(token_amount_to_withdraw.0)
        }
        else {
            (0,0)
        };
        pool.save(self);

        if pool.token_contract.as_str().eq(NEAR_PSEUDO_TOKEN) {
            // NEAR native token
            Promise::new(self.owner_id.clone()).transfer(token_amount_to_withdraw.0)
        } else {
            ext_ft::ext(pool.token_contract.clone())
                .with_static_gas(GAS_FOR_FT_TRANSFER)
                .with_attached_deposit(1)
                .ft_transfer(
                    self.owner_id.clone(),
                    U128::from(token_amount_to_withdraw),
                    None,
                )
                .then(
                    Self::ext(env::current_account_id())
                        .with_static_gas(GAS_FOR_RESOLVE_FT_TRANSFER)
                        .owner_withdraw_resolve_transfer(
                            &pool.token_symbol,
                            &pool.token_contract,
                            token_amount_to_withdraw.into(),
                            usd_amount.into(),
                        ),
                )
        }
    }

    #[private]
    pub fn owner_withdraw_resolve_transfer(
        &mut self,
        token_symbol: &String,
        token_contract: &AccountId,
        token_amount: U128,
        usd_amount: U128,
    ) {
        match env::promise_result(0) {
            PromiseResult::NotReady => unreachable!(),
            PromiseResult::Successful(_) => {
                log!(
                    "WITHDRAW SUCCESS: {} for a total of {} ",
                    token_symbol,
                    token_amount.0
                );
            }
            PromiseResult::Failed => {
                log!(
                    "WITHDRAW FAILED: {} for a total of {} not transferred. Undoing transaction.",
                    token_symbol,
                    token_amount.0
                );
                let mut pool = self.get_pool(&token_contract);
                // undo register of owner_tokens_withdrawn
                pool.total_real_owner_tokens_withdrawn -= token_amount.0;
                // if it is the main pool, restore liquidity amounts
                if token_contract.eq(&self.main_token_address) {
                    pool.token_balance += token_amount.0;
                    pool.usd_reserve += usd_amount.0;
                }
                pool.save(self);
            }
        }
    }
}
