import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Droplets,
  ChevronsRight,
  GitFork,
  Zap,
  Shield,
  BarChart2,
} from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container py-12 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-poolarize-primary/10 rounded-full mb-4">
            <Droplets className="h-8 w-8 text-poolarize-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">About Poolarize</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A Virtual Liquidity AMM Protocol for Capital-Efficient Token Swaps
          </p>
        </div>

        {/* Vision Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Vision</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-lg mb-4">
                Poolarize is a novel Automated Market Maker (AMM) protocol
                designed around the concept of virtual liquidity, enabling
                efficient token swaps with minimal capital requirements.
              </p>
              <p className="text-lg">
                Our mission is to revolutionize DeFi liquidity by creating a
                more capital-efficient ecosystem that benefits both liquidity
                providers and traders, while maintaining the robust price
                discovery mechanisms traditional AMMs offer.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-muted rounded-full p-3 shrink-0">
                  <GitFork className="h-6 w-6 text-poolarize-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Multi-Pool AMM</h3>
                  <p className="text-muted-foreground">
                    Poolarize supports multiple token pools, all centered around
                    a single main token. Additional tokens are traded via
                    virtual pools, allowing for 2-step swaps and efficient
                    cross-token trading.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-muted rounded-full p-3 shrink-0">
                  <Zap className="h-6 w-6 text-poolarize-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Virtual Liquidity
                  </h3>
                  <p className="text-muted-foreground">
                    Liquidity is only required for the main token, reducing the
                    need for dual-sided liquidity pools. The protocol simulates
                    liquidity for other tokens (referred to as "virtual"
                    balances).
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-muted rounded-full p-3 shrink-0">
                  <BarChart2 className="h-6 w-6 text-poolarize-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Oracle Integration
                  </h3>
                  <p className="text-muted-foreground">
                    The price of each token (relative to USD) is updated by
                    regular oracle calls. Oracle prices are valid for 5 minutes,
                    and the pool is automatically disabled if prices are not
                    updated or discrepancies arise.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-muted rounded-full p-3 shrink-0">
                  <Shield className="h-6 w-6 text-poolarize-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pool Safety</h3>
                  <p className="text-muted-foreground">
                    If the oracle prices and AMM prices deviate significantly,
                    the pool is temporarily disabled to prevent further trades
                    until the prices align. This protects users and the protocol
                    from potential exploits.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Liquidity Pool Flow */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Liquidity Pool Flow</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-muted p-4 rounded-lg w-full max-w-md text-center">
                  <h3 className="font-semibold mb-1">Step 1</h3>
                  <p>
                    Liquidity providers deposit only the main token into the
                    contract
                  </p>
                </div>

                <ChevronsRight className="h-6 w-6 rotate-90 md:rotate-0" />

                <div className="bg-muted p-4 rounded-lg w-full max-w-md text-center">
                  <h3 className="font-semibold mb-1">Step 2</h3>
                  <p>
                    Other tokens have virtual balances simulated based on oracle
                    prices
                  </p>
                </div>

                <ChevronsRight className="h-6 w-6 rotate-90 md:rotate-0" />

                <div className="bg-muted p-4 rounded-lg w-full max-w-md text-center">
                  <h3 className="font-semibold mb-1">Step 3</h3>
                  <p>
                    The AMM uses k=x*y formula for price calculation with the
                    virtual balances
                  </p>
                </div>

                <ChevronsRight className="h-6 w-6 rotate-90 md:rotate-0" />

                <div className="bg-muted p-4 rounded-lg w-full max-w-md text-center">
                  <h3 className="font-semibold mb-1">Step 4</h3>
                  <p>
                    Two-step swaps enable cross-token trading (e.g., Token A →
                    USD → Token B)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">
                  What makes Poolarize different from other AMMs?
                </h3>
                <p className="text-muted-foreground">
                  Poolarize introduces the concept of virtual liquidity, which
                  means liquidity providers only need to supply the main token
                  instead of both tokens in a trading pair. This significantly
                  reduces capital requirements while maintaining efficient price
                  discovery.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">
                  How are prices determined?
                </h3>
                <p className="text-muted-foreground">
                  Prices are determined by a combination of oracle feeds (for
                  the USD reference price) and the traditional AMM formula
                  (k=x*y) applied to virtual balances. This ensures accurate
                  pricing while maintaining the benefits of the AMM model.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">
                  Why might a pool be disabled?
                </h3>
                <p className="text-muted-foreground">
                  A pool may be disabled for two main reasons: if the oracle
                  price is not updated within 5 minutes (indicating a stale
                  price), or if there's a significant deviation between the
                  oracle price and the AMM price (indicating potential
                  manipulation or market dislocation).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">
                  How does automatic arbitrage work?
                </h3>
                <p className="text-muted-foreground">
                  The protocol automatically executes arbitrage trades when
                  large discrepancies between AMM prices and oracle prices are
                  detected. This ensures that the virtual pools remain aligned
                  with real market prices and provides a safety mechanism
                  against extreme price movements.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
