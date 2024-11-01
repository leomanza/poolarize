#![allow(clippy::assign_op_pattern)]
use uint::construct_uint;

pub mod constants;
pub mod interface;

construct_uint! {
    /// 256-bit unsigned integer.
    pub struct U256(4);
}

/// returns amount * numerator/denominator
pub fn proportional(amount: u128, numerator: u128, denominator: u128) -> u128 {
    (U256::from(amount) * U256::from(numerator) / U256::from(denominator)).as_u128()
}
