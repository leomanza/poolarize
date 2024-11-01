use crate::{ext_ft, util::constants::*, PoolMate, PoolMateExt};
use near_contract_standards::fungible_token::receiver::FungibleTokenReceiver;
use near_sdk::{
    env, json_types::U128, log, near_bindgen, AccountId, Promise, PromiseOrValue, PromiseResult,
};

#[near_bindgen]
impl FungibleTokenReceiver for PoolMate {
    fn ft_on_transfer(
        &mut self,
        sender_id: AccountId,
        amount: U128,
        // if main token deposit (owner): msg would be: {"token_contract", "token_amount"}
        //      "token_contract": define pool to add liquidity main token<>$tokenAddress
        //      "token_amount": amount of $tokenAddress to add on liquidity
        // if not, msg = min_main_expected:U128
        msg: String,
    ) -> PromiseOrValue<U128> {
        let in_amount = amount.0;
        // log!("ft_on_transfer pred:{} amount:{} sender:{} msg:{}", env::predecessor_account_id(), amount.0, sender_id, msg);
        // log!("main_token_address:{}", self.main_token_address);
        // if main token incoming
        if env::predecessor_account_id() == self.main_token_address {
            // adding main token liquidity to main pool
            self.assert_signer_owner_or_operator(); // only the owner or operator can do it
            self.process_operator_main_token_deposit(in_amount);
        } else {
            // user deposits some token to buy main token
            // check if the token the transfer is coming from is enabled
            let token_contract = &env::predecessor_account_id();
            if token_contract.as_str().eq(NEAR_PSEUDO_TOKEN) {
                // it can not happen, but let's close this option for security
                // since there's a pool with pseudo-token contract = "near" to support using native NEAR
                panic!("near is not a valid NEP-141 token")
            }
            // get pool or panic
            let min_amount_expected = msg.parse::<u128>().unwrap();
            self.internal_user_deposits_to_get_main_token(
                // save pool
                in_amount,
                token_contract,
                &sender_id,
                min_amount_expected,
            );
        }
        // send main token tokens can fail, but it is executed async
        // so don't return funds back to sender.
        // IF send main token tokens fail, and the tokens get stuck
        // we should provide the user a way to recover the tokens
        // (similar as what ref does)
        PromiseOrValue::Value(U128::from(0))
    }
}

#[near_bindgen]
impl PoolMate {
    // user wants to swap NEAR for main-token
    #[payable]
    pub fn deposit_near(&mut self, min_amount_token_out_expected: U128) {
        let pseudo_token_contract = &AccountId::new_unchecked(NEAR_PSEUDO_TOKEN.into());
        let near_amount = env::attached_deposit();
        let sender_id = &env::predecessor_account_id();
        log!(
            "{} swaps {} NEAR for {}",
            &sender_id,
            near_amount,
            &self.main_token_address
        );
        // user deposit to buy main token
        self.internal_user_deposits_to_get_main_token(
            near_amount,
            pseudo_token_contract,
            sender_id,
            min_amount_token_out_expected.0,
        );
    }

    /// we get here by processing on_ft_transfer or by the user calling deposit_near with NEAR attached
    /// Process token deposit to swap for MAIN
    pub(crate) fn internal_user_deposits_to_get_main_token(
        &mut self,
        amount_input_token: u128,
        input_token_contract: &AccountId,
        sender_id: &AccountId,
        min_amount_token_out_expected: u128,
    ) -> Promise {
        assert!(input_token_contract != &self.main_token_address);

        let mut pool = self.get_pool(input_token_contract);
        log!(
            "{} SENT {} {} ({})",
            sender_id,
            amount_input_token,
            pool.token_symbol,
            pool.token_contract,
        );
        assert!(pool.enabled, "{} pool is disabled", pool.token_symbol);
        assert!(
            pool.is_oracle_price_valid(),
            "{} pool oracle price is not valid - pool can not be used",
            pool.token_symbol
        );

        let mut main_pool = self.get_main_pool();
        // calculate usd to get - intermediate step
        let amount_intermediate_usd = pool.compute_usd_output(amount_input_token);
        assert!(amount_intermediate_usd >= E24, "min deposit value is 1 usd");
        // calculate main token amount to transfer
        let amount_main_token_out = main_pool.compute_token_output(amount_intermediate_usd);
        log!(
            "INPUT: {} {} ({} usd)",
            amount_input_token,
            &pool.token_symbol,
            amount_intermediate_usd
        );
        log!(
            "OUTPUT: {} {}. To {}",
            amount_main_token_out,
            &main_pool.token_symbol,
            &sender_id
        );
        assert!(
            amount_main_token_out >= min_amount_token_out_expected,
            "Slippage Error: output amount lower than min amount expected"
        );
        assert!(amount_main_token_out > 0);
        // is there enough main token to transfer?
        assert!(
            amount_main_token_out <= main_pool.token_balance,
            "Not enough {} balance. Current balance is {}",
            main_pool.token_symbol,
            main_pool.token_balance
        );
        // update balances on the (input_token)/usd pool
        pool.total_real_tokens_deposited += amount_input_token;
        pool.extract_usd(amount_input_token, amount_intermediate_usd);
        pool.save(self);

        // update balances on the main pool
        main_pool.extract_token(amount_intermediate_usd, amount_main_token_out);
        main_pool.save(self);

        self.internal_send_main_token_to_user(&sender_id, amount_main_token_out)
    }

    pub(crate) fn internal_send_main_token_to_user(
        &self,
        user: &AccountId,
        main_token_amount_to_transfer: u128,
    ) -> Promise {
        // send main token to the user
        ext_ft::ext(self.main_token_address.clone())
            .with_static_gas(GAS_FOR_FT_TRANSFER)
            .with_attached_deposit(1)
            .ft_transfer(user.clone(), main_token_amount_to_transfer.into(), None)
            .then(
                Self::ext(env::current_account_id())
                    .with_static_gas(GAS_FOR_RESOLVE_FT_TRANSFER)
                    .after_main_token_transfer(main_token_amount_to_transfer.into(), user),
            )
    }
    #[private]
    pub fn after_main_token_transfer(
        &mut self,
        main_token_amount_to_transfer: U128,
        receiver_id: &AccountId,
    ) {
        match env::promise_result(0) {
            PromiseResult::NotReady => unreachable!(),
            PromiseResult::Successful(_) => {
                log!(
                    "TRANSFER COMPLETED: {} tokens transferred to {}",
                    main_token_amount_to_transfer.0,
                    &receiver_id
                );
            }
            PromiseResult::Failed => {
                // prev transaction failed, so we didn't transfer main-tokens to the user
                let existing = self
                    .user_incomplete_main_token_transfers
                    .get(&receiver_id)
                    .unwrap_or_default();
                // register so the user can re-try the withdraw later
                self.user_incomplete_main_token_transfers
                    .insert(&receiver_id, &(existing + main_token_amount_to_transfer.0));
                log!(
                    "FAILED: {} main-tokens not transferred. Amount registered for user retry",
                    main_token_amount_to_transfer.0
                );
            }
        }
    }

    pub fn withdraw_stuck_main_tokens(&mut self) -> Promise {
        // for the failed transactions, let the user retry
        let existing = self
            .user_incomplete_main_token_transfers
            .get(&env::predecessor_account_id())
            .unwrap_or_default();
        assert!(existing > 0, "your balance to retry is zero");
        // remove the balance first
        self.user_incomplete_main_token_transfers
            .insert(&env::predecessor_account_id(), &0);
        // try the transfer again
        self.internal_send_main_token_to_user(&env::predecessor_account_id(), existing)
    }

    // check if the user has stuck main-tokens to withdraw
    pub fn get_main_token_stuck_amount(&self, account_id: &AccountId) -> U128 {
        self.user_incomplete_main_token_transfers
            .get(account_id)
            .unwrap_or_default()
            .into()
    }

    /// Process deposit of main token from the owner
    /// (only the owner can deposit main token)
    /// adds the fund without altering price (but price will be stickier because the added liquidity)
    fn process_operator_main_token_deposit(&mut self, amount_main_token_deposited: u128) {
        /* spellchecker: disable */
        // TODO: pedir el precio de main antes y luego del deposito no haya diferencia de +/- 5%
        // usar el compute
        // evitar checkeo si virtual_balance es 0
        // compute main token price before deposit
        // let main_on_return_before_deposit = self.internal_compute_main_amount_on_return(&currency, 0);
        /* spellchecker: enable */

        let mut main_pool = self.get_main_pool();

        let (_added_usd, spot_price_usd) =
            main_pool.add_token_liquidity_no_price_change(amount_main_token_deposited);
        // in the main pool, tokens are real not virtual
        main_pool.total_real_tokens_deposited += amount_main_token_deposited;
        main_pool.save(self);

        let post_spot_price_usd = main_pool.spot_price_usd().unwrap();

        if spot_price_usd != 0
            && (post_spot_price_usd > spot_price_usd * 10001 / 10000
                || post_spot_price_usd < spot_price_usd * 9999 / 10000)
        {
            log!(
                "ERR main token spot price pre:{}, post:{}",
                spot_price_usd,
                post_spot_price_usd
            );
            panic!("main token spot price changed more than 0.01%")
        };
        log!(
            "PROCESS OPERATOR DEPOSIT: {} {} deposited, new amounts {}/{} usd",
            amount_main_token_deposited,
            main_pool.token_symbol,
            main_pool.token_balance,
            main_pool.usd_reserve,
        );
        log!(
            "prev main token price: {}, post main token price {}",
            spot_price_usd,
            post_spot_price_usd
        );
    }
}
