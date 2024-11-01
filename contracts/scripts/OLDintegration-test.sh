export YOCTO_UNITS=000000000000000000000000
export TOTAL_PREPAID_GAS=300000000000000

export OWNER=poolmateowner.testnet
export MASTER_ACCOUNT=poolmate.testnet
export OPERATOR=poolmateoperator.testnet
export CONTRACT_ADDRESS=a2.poolmate.testnet
export MAIN_TOKEN_CONTRACT_ADDRESS=v1-mtoken.poolmate.testnet
export MAIN_TOKEN_DECIMALS=24
export MAIN_TOKEN_NAME="main token"
export MAIN_TOKEN_SYMBOL="mToken"
export MAIN_TOKEN_SUPPLY=1000000000
export PTOKEN_CONTRACT_ADDRESS=v1-ptoken.poolmate.testnet
export PTOKEN_DECIMALS=24
export PTOKEN_NAME="pool token"
export PTOKEN_SYMBOL="pToken"
export PTOKEN_SUPPLY=1000000000

export PTOKEN_POOL_INITIAL_LIQUIDITY=1000000000$YOCTO_UNITS




# create pool

## add pool for ptoken
# near contract call-function as-transaction $CONTRACT_ADDRESS add_pool json-args '{"token_contract":"'$PTOKEN_CONTRACT_ADDRESS'"}' prepaid-gas '300.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as poolmateowner.testnet network-config testnet sign-with-keychain send


# get pools

near contract call-function as-read-only $CONTRACT_ADDRESS get_pools json-args {} network-config testnet now

echo "add liquidity to pToken pool"

near contract call-function as-transaction $CONTRACT_ADDRESS add_liquidity json-args '{"token_contract":"'$PTOKEN_CONTRACT_ADDRESS'", "amount_token":"'$PTOKEN_POOL_INITIAL_LIQUIDITY'"}' prepaid-gas '300.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as $OPERATOR network-config testnet sign-with-keychain send

echo "enable pool"
# enable pool
near contract call-function as-transaction $CONTRACT_ADDRESS enable_pool json-args '{"token_contract":"'$PTOKEN_CONTRACT_ADDRESS'"}' prepaid-gas '300.0 Tgas' attached-deposit '1 yoctoNEAR' sign-as poolmateowner.testnet network-config testnet sign-with-keychain send

near contract call-function as-read-only $CONTRACT_ADDRESS get_pools json-args {} network-config testnet now
