
import { OracleStatus } from "@/utils/oracleService";

export interface Pool {
  id: string;
  mainToken: string;
  virtualToken: string;
  tvl: string;
  price: string;
  priceNumeric: number;
  oracleStatus: OracleStatus;
  utilization: number;
  oracleEndpoint: string;
  lastOracleUpdate: number;
  swapFee: number;
  autoArbitrage: boolean;
  createdAt: number;
}

export interface PoolCreationParams {
  mainToken: string;
  virtualToken: string;
  initialLiquidity: number;
  oracleType: string;
  oracleEndpoint: string;
  swapFee: number;
  autoArbitrage: boolean;
}

// Helper function to format numbers for display
export const formatNumber = (num: number, decimals = 2): string => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
};

// Format currency with dollar sign
export const formatCurrency = (num: number): string => {
  return `$${formatNumber(num)}`;
};

// Format TVL for display
export const formatTVL = (amount: number): string => {
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  } else if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(1)}K`;
  } else {
    return `$${amount.toFixed(2)}`;
  }
};

// Format price display string
export const formatPriceString = (mainToken: string, quoteToken: string, price: number): string => {
  return `1 ${mainToken} = ${formatNumber(price, 6)} ${quoteToken}`;
};
