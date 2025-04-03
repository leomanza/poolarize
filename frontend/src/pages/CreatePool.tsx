import { useState } from "react";
import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import {
  CircleDollarSign,
  HelpCircle,
  Info,
  Loader2,
  RotateCw,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TokenLogo from "@/components/TokenLogo";
import { fetchOraclePrice } from "@/utils/oracleService";

const CreatePool = () => {
  const { toast: shadcnToast } = useToast();
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [initialLiquidity, setInitialLiquidity] = useState("100000");
  const [oracleType, setOracleType] = useState("api");
  const [oracleAddress, setOracleAddress] = useState("");
  const [swapFee, setSwapFee] = useState([0.3]);
  const [autoArbitrage, setAutoArbitrage] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTestingOracle, setIsTestingOracle] = useState(false);
  const [oracleTestResult, setOracleTestResult] = useState<{
    success: boolean;
    price?: number;
    message: string;
  } | null>(null);

  const handleTestOracle = async () => {
    if (!oracleAddress || !tokenSymbol) {
      toast.error("Please enter both a token symbol and oracle endpoint");
      return;
    }

    setIsTestingOracle(true);
    setOracleTestResult(null);

    try {
      const result = await fetchOraclePrice(oracleAddress, tokenSymbol);

      if (result) {
        setOracleTestResult({
          success: true,
          price: result.price,
          message: `Successfully fetched price: ${result.price} USD for 1 ${tokenSymbol}`,
        });
      } else {
        setOracleTestResult({
          success: false,
          message: "Failed to fetch price from oracle endpoint",
        });
      }
    } catch (error) {
      setOracleTestResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    } finally {
      setIsTestingOracle(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!oracleTestResult?.success) {
      toast.error("Please test the oracle connection first");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call or contract interaction
    setTimeout(() => {
      shadcnToast({
        title: "Pool Created Successfully",
        description: `Created new pool for ${tokenSymbol} with ${initialLiquidity} VLQT as initial liquidity`,
      });

      toast.success(`${tokenSymbol} pool created successfully!`, {
        description: `Oracle will update prices every 5 minutes`,
      });

      setIsSubmitting(false);

      // Would normally redirect to the new pool page
    }, 2000);
  };

  return (
    <Layout>
      <div className="container py-10 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Create New Pool</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Add a new token with oracle integration to establish a virtual
          liquidity pool
        </p>

        <Card className="card-gradient">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CircleDollarSign className="h-6 w-6 text-poolarize-accent" />
              <div>
                <CardTitle>Pool Configuration</CardTitle>
                <CardDescription>
                  Configure the parameters for your pool
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="tokenSymbol"
                    className="mb-1 flex items-center gap-2"
                  >
                    Token Symbol
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Enter the symbol of the token you want to create a
                          virtual pool for (e.g., ETH, LINK).
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <div className="flex gap-4 items-center">
                    <Input
                      id="tokenSymbol"
                      value={tokenSymbol}
                      onChange={(e) =>
                        setTokenSymbol(e.target.value.toUpperCase())
                      }
                      placeholder="e.g. VLQT, CENT, PLZR"
                      className="w-full"
                      maxLength={20}
                      required
                    />
                    {tokenSymbol && (
                      <TokenLogo symbol={tokenSymbol} size="md" />
                    )}
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="initialLiquidity"
                    className="mb-1 flex items-center gap-2"
                  >
                    Initial Liquidity
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          The amount of VLQT token to provide as initial
                          liquidity for this virtual pool.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    id="initialLiquidity"
                    type="number"
                    value={initialLiquidity}
                    onChange={(e) => setInitialLiquidity(e.target.value)}
                    min="100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="oracleType"
                    className="mb-1 flex items-center gap-2"
                  >
                    Oracle Type
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Select the type of oracle to use for price feeds.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Select value={oracleType} onValueChange={setOracleType}>
                    <SelectTrigger id="oracleType">
                      <SelectValue placeholder="Select oracle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="api">API Oracle</SelectItem>
                      <SelectItem value="custom">Custom Oracle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="oracleAddress"
                    className="mb-1 flex items-center gap-2"
                  >
                    Oracle Endpoint URL
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Enter the oracle endpoint URL that will provide price
                          data for this token.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="oracleAddress"
                      value={oracleAddress}
                      onChange={(e) => setOracleAddress(e.target.value)}
                      placeholder={
                        oracleType === "api"
                          ? "https://api.example.com/prices/{token}"
                          : "..."
                      }
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleTestOracle}
                      disabled={
                        isTestingOracle || !oracleAddress || !tokenSymbol
                      }
                    >
                      {isTestingOracle ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <RotateCw className="h-4 w-4 mr-2" />
                      )}
                      Test
                    </Button>
                  </div>

                  {oracleTestResult && (
                    <div
                      className={`mt-2 p-2 text-sm rounded ${oracleTestResult.success ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
                    >
                      {oracleTestResult.message}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground mt-1">
                    For testing, use:
                    https://api.coingecko.com/api/v3/simple/price?ids=
                    {tokenSymbol}&vs_currencies=usd
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label
                      htmlFor="swapFee"
                      className="flex items-center gap-2"
                    >
                      Swap Fee Percentage
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            The percentage fee charged on each swap. Standard is
                            0.3%.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <span className="font-medium">{swapFee[0]}%</span>
                  </div>
                  <Slider
                    id="swapFee"
                    value={swapFee}
                    onValueChange={setSwapFee}
                    min={0.1}
                    max={1}
                    step={0.1}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                  <div className="space-y-0.5">
                    <Label
                      htmlFor="autoArbitrage"
                      className="flex items-center gap-2"
                    >
                      Auto Arbitrage
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Automatically arbitrage between oracle and pool
                            prices to maintain price alignment.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Enable automatic arbitrage for this pool
                    </p>
                  </div>
                  <Switch
                    id="autoArbitrage"
                    checked={autoArbitrage}
                    onCheckedChange={setAutoArbitrage}
                  />
                </div>
              </div>

              <div className="rounded-md bg-muted p-4 flex items-start gap-3">
                <Info className="h-5 w-5 text-poolarize-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">
                    Oracle Maintenance Requirements
                  </p>
                  <p className="text-muted-foreground">
                    This pool will require oracle price updates every 5 minutes.
                    If the oracle fails to update, the pool will be
                    automatically disabled until prices are refreshed.
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || !oracleTestResult?.success}
              >
                {isSubmitting ? "Creating Pool..." : "Create Virtual Pool"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default CreatePool;
