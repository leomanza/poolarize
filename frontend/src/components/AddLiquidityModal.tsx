import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TokenLogo from "@/components/TokenLogo";
import { toast } from "sonner";
import { ArrowDown, Info } from "lucide-react";

interface AddLiquidityModalProps {
  isOpen: boolean;
  onClose: () => void;
  mainToken: string;
  virtualToken: string;
  currentPrice: string;
}

const AddLiquidityModal = ({
  isOpen,
  onClose,
  mainToken,
  virtualToken,
  currentPrice,
}: AddLiquidityModalProps) => {
  const [amount, setAmount] = useState("");
  const [virtualAmount, setVirtualAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse the currentPrice string (format: "1 VLQT = X TOKEN")
  const priceRatio = parseFloat(
    currentPrice.split("=")[1].trim().split(" ")[0],
  );

  const handleAmountChange = (value: string) => {
    setAmount(value);

    // Calculate the equivalent virtual amount based on the price ratio
    if (value && !isNaN(parseFloat(value))) {
      const calculatedVirtual = (parseFloat(value) * priceRatio).toFixed(6);
      setVirtualAmount(calculatedVirtual);
    } else {
      setVirtualAmount("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call or contract interaction
    setTimeout(() => {
      toast.success(
        `Successfully added ${amount} ${mainToken} to the ${mainToken}/${virtualToken} pool`,
      );
      setIsSubmitting(false);
      resetForm();
      onClose();
    }, 1500);
  };

  const resetForm = () => {
    setAmount("");
    setVirtualAmount("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] card-gradient">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex items-center">
              <TokenLogo symbol={mainToken} size="sm" />
              <span className="mx-1">/</span>
              <TokenLogo symbol={virtualToken} size="sm" />
            </div>
            Add Liquidity
          </DialogTitle>
          <DialogDescription>
            Add liquidity to the {mainToken}/{virtualToken} virtual pool
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="mainAmount">{mainToken} Amount</Label>
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <Input
                  id="mainAmount"
                  type="number"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  min="0"
                  step="0.000001"
                  className="pr-16"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {mainToken}
                </div>
              </div>
              <TokenLogo symbol={mainToken} size="sm" />
            </div>
          </div>

          <div className="flex justify-center my-2">
            <ArrowDown className="text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="virtualAmount" className="flex justify-between">
              <span>Simulated {virtualToken} (Virtual)</span>
              <span className="text-sm text-muted-foreground">
                Current Price: {currentPrice}
              </span>
            </Label>
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <Input
                  id="virtualAmount"
                  type="text"
                  placeholder="0.0"
                  value={virtualAmount}
                  readOnly
                  className="pr-16 bg-muted/40"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {virtualToken}
                </div>
              </div>
              <TokenLogo symbol={virtualToken} size="sm" />
            </div>
          </div>

          <div className="rounded-md bg-muted p-3 flex items-start gap-3">
            <Info className="h-5 w-5 text-poolarize-primary shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">Virtual Liquidity</p>
              <p className="text-muted-foreground">
                Remember that in Poolarize, you only need to provide {mainToken}{" "}
                tokens. The {virtualToken} balance is simulated based on the
                oracle price.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !amount || parseFloat(amount) <= 0}
            >
              {isSubmitting ? "Adding Liquidity..." : "Add Liquidity"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLiquidityModal;
