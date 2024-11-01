use near_sdk::env;
use crate::PoolMate;

impl PoolMate {
    pub(crate) fn assert_owner(&self) {
        assert_eq!(
            &env::predecessor_account_id(),
            &self.owner_id,
            "Only allowed for owner."
        );
    }
    pub(crate) fn assert_signer_owner_or_operator(&self) {
        assert!(
            &env::signer_account_id() == &self.owner_id
                || &env::signer_account_id() == &self.operator_id,
            "Only allowed for owner or operator."
        );
    }

}
