
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownIcon, RefreshCw, Settings } from "lucide-react";
import TokenLogo from "./TokenLogo";

const SwapCard = () => {
  const [fromToken, setFromToken] = useState("USDT");
  const [toToken, setToToken] = useState("VLQT");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSwap = () => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  // Simulate price calculation when from amount changes
  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);
    
    // Simple simulation - in a real app, this would call the AMM formula or an API
    if (value && !isNaN(Number(value))) {
      const price = fromToken === "USDT" ? 2.5 : 0.4; // Dummy exchange rate
      setToAmount((Number(value) * price).toFixed(6));
    } else {
      setToAmount("");
    }
  };

  // Simulate price calculation when to amount changes
  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToAmount(value);
    
    if (value && !isNaN(Number(value))) {
      const price = toToken === "USDT" ? 2.5 : 0.4; // Dummy exchange rate (inverse of above)
      setFromAmount((Number(value) / price).toFixed(6));
    } else {
      setFromAmount("");
    }
  };
  
  const handleSwitchTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  return (
    <Card className="w-full max-w-md mx-auto card-gradient">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Swap</CardTitle>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Trade tokens using virtual liquidity pools</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* From token */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">From</label>
            <span className="text-sm text-muted-foreground">Balance: 0.0</span>
          </div>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="0.0"
                value={fromAmount}
                onChange={handleFromAmountChange}
              />
              <Button 
                variant="ghost" 
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setFromAmount("1000")} // Max button simulation
              >
                MAX
              </Button>
            </div>
            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger className="w-[140px]">
                <SelectValue>
                  <div className="flex items-center">
                    <TokenLogo symbol={fromToken} size="sm" className="mr-2" />
                    {fromToken}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USDT">
                  <div className="flex items-center">
                    <TokenLogo symbol="USDT" size="sm" className="mr-2" />
                    USDT
                  </div>
                </SelectItem>
                <SelectItem value="ETH">
                  <div className="flex items-center">
                    <TokenLogo symbol="ETH" size="sm" className="mr-2" />
                    ETH
                  </div>
                </SelectItem>
                <SelectItem value="VLQT">
                  <div className="flex items-center">
                    <TokenLogo symbol="VLQT" size="sm" className="mr-2" />
                    VLQT
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Switch tokens button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-muted h-8 w-8"
            onClick={handleSwitchTokens}
          >
            <ArrowDownIcon className="h-4 w-4" />
          </Button>
        </div>
        
        {/* To token */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">To</label>
            <span className="text-sm text-muted-foreground">Balance: 0.0</span>
          </div>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="0.0"
              value={toAmount}
              onChange={handleToAmountChange}
              className="flex-1"
            />
            <Select value={toToken} onValueChange={setToToken}>
              <SelectTrigger className="w-[140px]">
                <SelectValue>
                  <div className="flex items-center">
                    <TokenLogo symbol={toToken} size="sm" className="mr-2" />
                    {toToken}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USDT">
                  <div className="flex items-center">
                    <TokenLogo symbol="USDT" size="sm" className="mr-2" />
                    USDT
                  </div>
                </SelectItem>
                <SelectItem value="ETH">
                  <div className="flex items-center">
                    <TokenLogo symbol="ETH" size="sm" className="mr-2" />
                    ETH
                  </div>
                </SelectItem>
                <SelectItem value="VLQT">
                  <div className="flex items-center">
                    <TokenLogo symbol="VLQT" size="sm" className="mr-2" />
                    VLQT
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Price info */}
        {fromAmount && toAmount && (
          <div className="px-3 py-2 bg-muted rounded-md">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Price:</span>
              <span>1 {fromToken} = {(Number(toAmount) / Number(fromAmount)).toFixed(6)} {toToken}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-muted-foreground">Route:</span>
              <span className="flex items-center">
                {fromToken} → USD → {toToken}
              </span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-poolarize-primary hover:bg-poolarize-secondary" onClick={handleSwap} disabled={!fromAmount || !toAmount}>
          {loading ? (
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          {loading ? "Swapping..." : "Swap"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SwapCard;
