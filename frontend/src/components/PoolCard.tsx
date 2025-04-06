import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import TokenPair from "./TokenPair";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, TrendingUp } from "lucide-react";
import AddLiquidityModal from "./AddLiquidityModal";

interface PoolCardProps {
  mainToken: string;
  virtualToken: string;
  tvl: string;
  price: string;
  oracleStatus: "active" | "expired" | "disabled";
  utilization: number;
}

const PoolCard = ({
  mainToken,
  virtualToken,
  tvl,
  price,
  oracleStatus,
  utilization,
}: PoolCardProps) => {
  const [isAddLiquidityOpen, setIsAddLiquidityOpen] = useState(false);

  return (
    <Card className="overflow-hidden card-gradient">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <TokenPair baseToken={mainToken} quoteToken={virtualToken} />
          <Badge
            variant={oracleStatus === "active" ? "default" : "destructive"}
            className={oracleStatus === "active" ? "bg-green-500" : ""}
          >
            {oracleStatus === "active"
              ? "Oracle Active"
              : oracleStatus === "expired"
                ? "Oracle Expired"
                : "Pool Disabled"}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2">
          {mainToken}/{virtualToken}
        </CardTitle>
        <CardDescription>Virtual Liquidity Pool</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">TVL</p>
            <p className="text-lg font-semibold">{tvl}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-lg font-semibold">{price}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-muted-foreground">Utilization</span>
            <span className="text-sm font-medium">{utilization}%</span>
          </div>
          <Progress value={utilization} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          className="w-full"
          size="sm"
          onClick={() => setIsAddLiquidityOpen(true)}
          disabled={oracleStatus !== "active"}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Liquidity
        </Button>
        <Button variant="outline" size="sm" className="px-3">
          <Settings className="h-4 w-4" />
        </Button>
      </CardFooter>

      <AddLiquidityModal
        isOpen={isAddLiquidityOpen}
        onClose={() => setIsAddLiquidityOpen(false)}
        mainToken={mainToken}
        virtualToken={virtualToken}
        currentPrice={price}
      />
    </Card>
  );
};

export default PoolCard;
