import Layout from "@/components/Layout";
import SwapCard from "@/components/SwapCard";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, HelpCircle } from "lucide-react";

const Swap = () => {
  return (
    <Layout>
      <div className="container py-10 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Swap Tokens</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 order-2 md:order-1">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">
                      Virtual Liquidity Notice
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      This AMM uses virtual liquidity pools. Prices are
                      determined by oracle feeds and the k=x*y formula. Oracle
                      prices are updated every 5 minutes, and pools may be
                      disabled if the oracle price is stale.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border">
                <div className="flex items-start gap-4">
                  <TrendingUp className="h-6 w-6 text-poolarize-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      How Two-Step Swaps Work
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      When you swap tokens in Poolarize, the transaction follows
                      a two-step path through USD:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                      <li>
                        First, your source token is converted to USD at the
                        oracle price
                      </li>
                      <li>
                        Then, USD is converted to your destination token at the
                        oracle price
                      </li>
                      <li>
                        The AMM formula k=x*y applies to each step, determining
                        the final output
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <div className="flex items-start gap-4">
                  <HelpCircle className="h-6 w-6 text-poolarize-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      Important Information
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Each pool has a 0.3% swap fee</li>
                      <li>
                        Pools may be disabled if the oracle price is not updated
                        within 5 minutes
                      </li>
                      <li>
                        Maximum slippage can be adjusted in the swap settings
                      </li>
                      <li>
                        The protocol automatically arbitrages between oracle and
                        pool prices
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 order-1 md:order-2">
            <SwapCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Swap;
