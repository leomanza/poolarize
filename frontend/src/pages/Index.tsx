import Layout from "@/components/Layout";
import StatCard from "@/components/StatCard";
import VirtualPoolCard from "@/components/VirtualPoolCard";
import { Button } from "@/components/ui/button";
import {
  BarChart4,
  Droplets,
  ExternalLink,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Dummy data for our virtual pools
  const virtualPools = [
    {
      mainToken: "VLQT",
      virtualToken: "USDT",
      tvl: "$2.5M",
      price: "1 VLQT = 0.4 USDT",
      oracleStatus: "active" as const,
      utilization: 68,
    },
    {
      mainToken: "VLQT",
      virtualToken: "ETH",
      tvl: "$1.2M",
      price: "1 VLQT = 0.0002 ETH",
      oracleStatus: "active" as const,
      utilization: 45,
    },
    {
      mainToken: "VLQT",
      virtualToken: "BTC",
      tvl: "$3.7M",
      price: "1 VLQT = 0.000015 BTC",
      oracleStatus: "expired" as const,
      utilization: 92,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-pool-gradient text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Capital-Efficient Token Swaps with Virtual Liquidity
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/80">
              Poolarize is a novel AMM protocol designed to maximize capital
              efficiency through virtual liquidity pools and oracle-driven price
              discovery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-poolarize-primary hover:bg-white/90"
              >
                <Link to="/swap">Start Swapping</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/pools">Explore Pools</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Background graphic elements */}
        <div className="absolute right-0 top-0 bottom-0 hidden lg:block w-1/3 overflow-hidden">
          <div className="absolute -right-64 top-1/2 transform -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/10 backdrop-blur-3xl"></div>
          <div className="absolute -right-32 top-1/4 w-[300px] h-[300px] rounded-full bg-white/5 backdrop-blur-3xl"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Value Locked"
              value="$2.1M"
              virtualValue="$5.3M"
              description="↑ 12% from last week"
              trend="up"
              icon={<Wallet className="h-4 w-4" />}
            />
            <StatCard
              title="24h Volume"
              value="$1.2M"
              description="↓ 5% from yesterday"
              trend="down"
              icon={<BarChart4 className="h-4 w-4" />}
            />
            <StatCard
              title="Active Pools"
              value="8"
              description="2 pools with stale oracles"
              icon={<Droplets className="h-4 w-4" />}
            />
            <StatCard
              title="Price Impact"
              value="0.05%"
              description="Average for $10K swap"
              icon={<TrendingUp className="h-4 w-4" />}
            />
          </div>
        </div>
      </section>

      {/* Virtual Pools Section */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Virtual Pools</h2>
            <Button asChild variant="outline">
              <Link to="/pools">View All Pools</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {virtualPools.map((pool, index) => (
              <VirtualPoolCard
                key={index}
                mainToken={pool.mainToken}
                virtualToken={pool.virtualToken}
                tvl={pool.tvl}
                price={pool.price}
                oracleStatus={pool.oracleStatus}
                utilization={pool.utilization}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Poolarize Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our innovative virtual liquidity model changes how AMMs function,
              requiring less capital while maintaining efficient price
              discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border">
              <div className="w-12 h-12 bg-poolarize-primary/10 rounded-full flex items-center justify-center mb-4">
                <Droplets className="h-6 w-6 text-poolarize-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Virtual Liquidity</h3>
              <p className="text-muted-foreground">
                Only the main token requires actual liquidity. Other tokens
                operate through virtual balances simulated by the protocol.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <div className="w-12 h-12 bg-poolarize-primary/10 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-poolarize-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Oracle Integration</h3>
              <p className="text-muted-foreground">
                Prices for all tokens are regularly updated via oracles,
                ensuring accurate pricing and preventing manipulation.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <div className="w-12 h-12 bg-poolarize-primary/10 rounded-full flex items-center justify-center mb-4">
                <BarChart4 className="h-6 w-6 text-poolarize-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Two-Step Swaps</h3>
              <p className="text-muted-foreground">
                Tokens are swapped through a two-step process: Token A → USD →
                Token B, enabling efficient cross-token trading.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" className="gap-2">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Read the Documentation
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
