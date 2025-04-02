## Poolarize: A Virtual Liquidity AMM Protocol for Capital-Efficient Token Swaps

## Overview
Poolarize is a novel Automated Market Maker (AMM) protocol designed around the concept of virtual liquidity, enabling efficient token swaps with minimal capital requirements. This AMM distributes a main token and accepts various other tokens in exchange. Virtual pools simulate liquidity for non-main tokens, while an integrated oracle system ensures accurate pricing, using USD as the reference quote. The protocol offers built-in mechanisms for price stabilization, automatic arbitrage, and capital-efficient liquidity provision.

## Core Features
1. Multi-Pool AMM: Supports multiple token pools, all centered around a single main token. Additional tokens are traded via virtual pools, allowing for 2-step swaps and efficient cross-token trading.
1. Virtual Liquidity: Liquidity is only required for the main token, reducing the need for dual-sided liquidity pools. The protocol simulates liquidity for other tokens (referred to as "virtual" balances).
1. Oracle Integration: The price of each token (relative to USD) is updated by regular oracle calls. Oracle prices are valid for 5 minutes, and the pool is automatically disabled if prices are not updated or discrepancies arise.

**Stablecoin Pools**
To facilitate trading using stablecoins like USDT, dedicated pools (e.g., USDT/USD) are used, with prices updated regularly by the oracle.
Capital Efficiency: By focusing on virtual liquidity for non-main tokens, the protocol minimizes the capital required for liquidity providers while maintaining price discovery and market dynamics using the traditional AMM formula (k=x*y).


## How It Works
## Liquidity Pools & Virtual Balances
In a typical AMM, liquidity providers must provide two assets (e.g., Token A and Token B). However, Poolarize innovates by requiring liquidity only for the main token:

* Liquidity providers deposit main token into the contract.
* Other tokens (e.g., pToken, USDT) have virtual balances that are simulated based on oracle prices and market demand.
* The AMM continues to use the traditional k=x*y formula to calculate prices, but only the main token is physically present in the liquidity pools.

### Price Updates & Oracle System
All non-main token prices (e.g., pToken/USD) are updated using oracle price calls. These prices are valid for 5 minutes. If a price is not updated within this period, the corresponding pool is automatically disabled to prevent mispricing.

### Stablecoin Pools
Pools such as USDT/USD are created to enable stablecoin transactions.
The price of stablecoins is updated via the oracle system, ensuring that swaps using USDT (or other stablecoins) remain accurate.

### Two-Step Swaps & Cross-Token Trading
Stablecoin pools enable 2-step swaps using virtual liquidity pools:

For example, a user wishing to swap pToken to mToken would go through the following path: pToken -> USD -> mToken.
The price of each swap is calculated based on the k=x*y formula and the latest oracle prices.

## Main use case
Capital-Efficient Liquidity Provision: Liquidity providers can participate by depositing only the main token, with no need to supply liquidity for other tokens, making this system attractive for users with limited capital.
The contract distributes the main token, accepting multiple tokens in exchange based on their real or virtual liquidity.


## Next steps
1. Automatic Arbitrage: The protocol automatically arbitrages price discrepancies between the oracle and AMM prices, ensuring efficient market functioning and liquidity utilization.
The protocol automatically executes arbitrage trades when large discrepancies between AMM prices and oracle prices are detected.
1. Pool Disabling: 
1.1.The price for each token is updated every 5 minutes through an oracle. If the oracle call fails or exceeds 5 minutes without an update, the corresponding pool is disabled.
1.1.If the oracle prices and AMM prices deviate significantly, the pool is temporarily disabled to prevent further trades until the prices align.

## Getting Started

### Prerequisites
- [Bun](https://bun.sh) installed on your system
- [NEAR CLI](https://docs.near.org/docs/develop/basics/near-cli) installed for contract deployment
- [Make](https://www.gnu.org/software/make/) installed for contract building

### Quick Start

1. Clone the repository:
```sh
git clone https://github.com/leomanza/poolarize
cd poolarize
```

2. Install dependencies:
```sh
bun install
```

3. Start the development server:
```sh
bun run dev
```

### Available Commands

#### Frontend Commands
```sh
# Start development server
bun run frontend:dev

# Build for production
bun run frontend:build

# Build for development
bun run frontend:build:dev

# Preview production build
bun run frontend:preview

# Run linting
bun run frontend:lint
```

#### Contract Commands
```sh
# Build contracts
bun run contracts:build

# Run contract tests
bun run contracts:test

# Deploy contracts
bun run contracts:deploy
```

#### General Commands
```sh
# Format code
bun run fmt

# Check formatting
bun run fmt:check

# Run tests
bun run test
bun run test:ui  # Run tests with UI
```

### Test the contract

## Function list

### **add_pool**
Add pool
! Only allowed for contract owner
! If token address exists already, the function call will fail
```rust
fn add_pool(&mut self, token_contract: TokenAddressId)
```

### **remove_pool**
Remove pool
! Only allowed for contract owner
! If token address is not found, the function call will fail
```rust
fn remove_pool(&mut self, token_contract: TokenAddressId)
```

### **pool info**
Check pool data
```rust
fn get_pool_info(&self, token_contract: TokenAddressId) -> PoolInfoJson
```

### **get all pools**
Get pools
```rust
fn get_pools(&self) -> Vec<PoolInfoJson>
```

