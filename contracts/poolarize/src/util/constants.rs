use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::BorshStorageKey;
use near_sdk::Gas;

#[derive(BorshStorageKey, BorshSerialize, BorshDeserialize)]
pub(crate) enum Keys {
    Pools,
    IncompleteMainTokenTransfers,
}

pub const E24: u128 = 1_000_000_000_000_000_000_000_000;

pub const TGAS: u64 = 1_000_000_000_000;
pub const GAS_FOR_FT_TRANSFER: Gas = Gas(47 * TGAS);
pub const GAS_FOR_RESOLVE_FT_TRANSFER: Gas = Gas(11 * TGAS);

// NEAR native token pseudo-contract
pub const NEAR_PSEUDO_TOKEN: &str = "near";

