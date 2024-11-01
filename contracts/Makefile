lint:
	cargo clippy --all-targets --all-features -- -D warnings

fmt:
	cargo fmt
	
format:
	cargo fmt -- --check

doc:
	cargo doc

clean:
	cargo clean

integration:
	sh scripts/integration-tests.sh

build:
	echo "Building poolarize and generic-test-nep141"
	export RUSTFLAGS='-C link-arg=-s' 
	cargo build -p poolarize --target wasm32-unknown-unknown --release
	cargo build -p generic-nep-141-token-contract --target wasm32-unknown-unknown --release
	mkdir -p res
	rsync -u target/wasm32-unknown-unknown/release/poolarize.wasm res/
	rsync -u target/wasm32-unknown-unknown/release/generic_nep_141_token_contract.wasm res/

deploy-testnet:
	sh scripts/deploy/testnet-deploy.sh