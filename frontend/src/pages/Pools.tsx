import Layout from "@/components/Layout";
import PoolCard from "@/components/PoolCard";
import StatCard from "@/components/StatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart4, TrendingUp } from "lucide-react";

const Pools = () => {
  // Dummy data for active pools
  const activePools = [
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
      virtualToken: "DAI",
      tvl: "$980K",
      price: "1 VLQT = 0.4 DAI",
      oracleStatus: "active" as const,
      utilization: 32,
    },
    {
      mainToken: "VLQT",
      virtualToken: "WBTC",
      tvl: "$3.1M",
      price: "1 VLQT = 0.000015 BTC",
      oracleStatus: "active" as const,
      utilization: 74,
    },
  ];

  // Dummy data for disabled pools
  const disabledPools = [
    {
      mainToken: "VLQT",
      virtualToken: "BTC",
      tvl: "$3.7M",
      price: "1 VLQT = 0.000015 BTC",
      oracleStatus: "expired" as const,
      utilization: 92,
    },
    {
      mainToken: "VLQT",
      virtualToken: "LINK",
      tvl: "$650K",
      price: "1 VLQT = 0.08 LINK",
      oracleStatus: "disabled" as const,
      utilization: 28,
    },
  ];

  return (
    <Layout>
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-2">Pools</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Explore all the pools in the Poolarize protocol
        </p>

        {/* Pool Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Pools"
            value="6"
            description="4 active, 2 disabled"
            icon={<BarChart4 className="h-4 w-4" />}
          />
          <StatCard
            title="Total Liquidity"
            value="$8.1M"
            description="↑ 8% from last week"
            trend="up"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <StatCard
            title="24h Volume"
            value="$1.2M"
            description="Across all pools"
          />
          <StatCard
            title="Average Utilization"
            value="56.5%"
            description="Of available liquidity"
          />
        </div>

        {/* Pool Tabs */}
        <Tabs defaultValue="active" className="mb-6">
          <TabsList>
            <TabsTrigger value="active">
              Active Pools ({activePools.length})
            </TabsTrigger>
            <TabsTrigger value="disabled">
              Disabled Pools ({disabledPools.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activePools.map((pool, index) => (
                <PoolCard
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
          </TabsContent>

          <TabsContent value="disabled" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {disabledPools.map((pool, index) => (
                <PoolCard
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
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Pools;
