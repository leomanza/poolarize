export YOCTO_UNITS_24=000000000000000000000000
export 
export TOTAL_PREPAID_GAS=300000000000000

export OWNER=poolmateowner.testnet
export MASTER_ACCOUNT=poolmate.testnet
export OPERATOR=poolmateoperator.testnet
export CONTRACT_ADDRESS=a3.poolmate.testnet
# MAIN TOKEN
export MAIN_TOKEN_CONTRACT_ADDRESS=v1-mtoken.poolmate.testnet
export MAIN_TOKEN_DECIMALS=24
export MAIN_TOKEN_NAME="main token"
export MAIN_TOKEN_SYMBOL="mToken"
export MAIN_TOKEN_SUPPLY=1000000000

# P TOKEN
export PTOKEN_CONTRACT_ADDRESS=v1-ptoken.poolmate.testnet
export PTOKEN_DECIMALS=24
export PTOKEN_NAME="pool token"
export PTOKEN_SYMBOL="pToken"
export PTOKEN_SUPPLY=1000000000

# USDT TOKEN
export USDT_CONTRACT_ADDRESS=usdt.tether-token.poolmate.testnet
export USDT_DECIMALS=6
export USDT_NAME="usdt token"
export USDT_SYMBOL="USDT"
export USDT_SUPPLY=429999998



##signin
# network-config testnet sign-with-keychain manza sign-as $OWNER

# CONTRACT ACCCOUNT
# create account
near account create-account fund-myself $CONTRACT_ADDRESS '5 NEAR' autogenerate-new-keypair save-to-keychain sign-as $MASTER_ACCOUNT network-config testnet sign-with-keychain send
# Deploy Contract
near contract deploy $CONTRACT_ADDRESSt use-file res/poolarize.wasm with-init-call new json-args '{"owner_id": "'$OWNER'", "operator_id":"'$OPERATOR'", "main_token_address": "'$MAIN_TOKEN_CONTRACT_ADDRESS'" }' prepaid-gas '30 TeraGas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
## https://explorer.testnet.near.org/transactions/AM7oj1GqjxPJqQNy41RSgJhc3cSWp19iB4cyvQGwbzya
## Done deploying and initializing v1.poolmate.testnet

# main Token ACCCOUNT
# create account
near account create-account fund-myself $MAIN_TOKEN_CONTRACT_ADDRESS '2 NEAR' autogenerate-new-keypair save-to-keychain sign-as $MASTER_ACCOUNT network-config testnet sign-with-keychain send
# Deploy Contract
near contract deploy $MAIN_TOKEN_CONTRACT_ADDRESS use-file res/generic_nep_141_token_contract.wasm with-init-call new_default_meta json-args '{"owner_id": "'$OWNER'", "total_supply":"'$MAIN_TOKEN_SUPPLY'", "symbol": "'$MAIN_TOKEN_SYMBOL'", "decimals": '$MAIN_TOKEN_DECIMALS' }' prepaid-gas '30 TeraGas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
## https://explorer.testnet.near.org/transactions/AM7oj1GqjxPJqQNy41RSgJhc3cSWp19iB4cyvQGwbzya
## Done deploying and initializing


# pool Token ACCCOUNT
# create account
near account create-account fund-myself $PTOKEN_CONTRACT_ADDRESS '5 NEAR' autogenerate-new-keypair save-to-keychain sign-as $MASTER_ACCOUNT network-config testnet sign-with-keychain send
# Deploy Contract
near contract deploy $PTOKEN_CONTRACT_ADDRESS use-file res/generic_nep_141_token_contract.wasm with-init-call new_default_meta json-args '{"owner_id": "'$OWNER'", "total_supply":"'$PTOKEN_SUPPLY'", "symbol": "'$PTOKEN_SYMBOL'", "decimals": '$PTOKEN_DECIMALS' }' prepaid-gas '30 TeraGas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
## https://explorer.testnet.near.org/transactions/AM7oj1GqjxPJqQNy41RSgJhc3cSWp19iB4cyvQGwbzya
## Done deploying and initializing

# usdt Token ACCCOUNT
# create account
near account create-account fund-myself $USDT_CONTRACT_ADDRESS '2 NEAR' autogenerate-new-keypair save-to-keychain sign-as $MASTER_ACCOUNT network-config testnet sign-with-keychain send
# Deploy Contract
near contract deploy $USDT_CONTRACT_ADDRESS use-file res/generic_nep_141_token_contract.wasm with-init-call new_default_meta json-args '{"owner_id": "'$OWNER'", "total_supply":"'$USDT_SUPPLY'", "symbol": "'$USDT_SYMBOL'", "decimals": '$USDT_DECIMALS' }' prepaid-gas '30 TeraGas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
## https://explorer.testnet.near.org/transactions/AM7oj1GqjxPJqQNy41RSgJhc3cSWp19iB4cyvQGwbzya
## Done deploying and initializing
