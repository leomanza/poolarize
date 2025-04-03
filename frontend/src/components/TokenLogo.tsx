import { useState } from "react";
import { cn } from "@/lib/utils";

interface TokenLogoProps {
  symbol: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const TokenLogo = ({ symbol, className, size = "md" }: TokenLogoProps) => {
  const [hasError, setHasError] = useState(false);

  // This would typically be replaced with actual token logos
  const fallbackLogo = (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold",
        {
          "w-6 h-6 text-xs": size === "sm",
          "w-8 h-8 text-sm": size === "md",
          "w-12 h-12 text-base": size === "lg",
        },
        symbol === "VLQT"
          ? "bg-poolarize-primary text-white"
          : symbol === "USD" || symbol === "USDT"
            ? "bg-green-500 text-white"
            : "bg-blue-100 text-poolarize-primary dark:bg-gray-700",
        className,
      )}
    >
      {symbol.slice(0, 2)}
    </div>
  );

  // If using real images, this would be the image URL
  // const tokenImageUrl = `https://example.com/tokens/${symbol.toLowerCase()}.png`;

  if (hasError) {
    return fallbackLogo;
  }

  // For demo, we'll just use the fallback since we don't have real images
  return fallbackLogo;

  /* If using real images, this would be the code:
  return (
    <img
      src={tokenImageUrl}
      alt={`${symbol} logo`}
      className={cn(
        "rounded-full",
        {
          "w-6 h-6": size === "sm",
          "w-8 h-8": size === "md",
          "w-12 h-12": size === "lg",
        },
        className
      )}
      onError={() => setHasError(true)}
    />
  );
  */
};

export default TokenLogo;
