
import TokenLogo from "./TokenLogo";

interface TokenPairProps {
  baseToken: string;
  quoteToken: string;
  size?: "sm" | "md" | "lg";
}

const TokenPair = ({ baseToken, quoteToken, size = "md" }: TokenPairProps) => {
  return (
    <div className="relative flex items-center">
      <TokenLogo symbol={baseToken} size={size} />
      <TokenLogo 
        symbol={quoteToken} 
        size={size} 
        className="-ml-2 border-2 border-white dark:border-gray-900" 
      />
    </div>
  );
};

export default TokenPair;
