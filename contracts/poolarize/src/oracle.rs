use crate::{PoolMate, PoolMateExt};
use near_sdk::{
    assert_one_yocto,
    json_types::U128,
    near_bindgen,
    serde::{Deserialize, Serialize},
    AccountId
};

#[near_bindgen]
#[derive(Deserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct OraclePricesJson {
    token_contract: AccountId,
    spot_price_usd_24d: U128,
}

#[near_bindgen]
impl PoolMate {
    #[payable]

    pub fn set_oracle_prices(&mut self, prices: Vec<OraclePricesJson>) {
        assert_one_yocto();
        self.assert_signer_owner_or_operator();
        for price in prices.iter() {
            let mut pool = self.get_pool(&price.token_contract);
            pool.set_oracle_price(price.spot_price_usd_24d.0);
            pool.save(self);
        }
    }

}
