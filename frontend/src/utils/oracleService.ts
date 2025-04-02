
import { toast } from "sonner";

export type OracleStatus = "active" | "expired" | "disabled";

export interface OracleResponse {
  price: number;
  timestamp: number;
  signature?: string; // For future proof verification
}

// Cache for oracle responses to avoid unnecessary API calls
const oracleCache: Record<string, { data: OracleResponse; expiresAt: number }> = {};

export const fetchOraclePrice = async (endpoint: string, tokenSymbol: string): Promise<OracleResponse | null> => {
  try {
    // Check cache first
    const now = Date.now();
    const cacheKey = `${endpoint}_${tokenSymbol}`;
    
    if (oracleCache[cacheKey] && oracleCache[cacheKey].expiresAt > now) {
      return oracleCache[cacheKey].data;
    }
    
    // Format URL with token symbol if needed
    const url = endpoint.includes('{token}') 
      ? endpoint.replace('{token}', tokenSymbol.toLowerCase())
      : endpoint;
    
    console.log(`Fetching price from oracle: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Oracle API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Oracle response data:', data);
    
    // Handle different API response formats
    let price: number;
    
    if (data.price !== undefined) {
      // Direct price format
      price = typeof data.price === 'number' ? data.price : parseFloat(data.price);
    } else if (data[tokenSymbol.toLowerCase()] && data[tokenSymbol.toLowerCase()].usd) {
      // CoinGecko format: { "bitcoin": { "usd": 50000 } }
      price = data[tokenSymbol.toLowerCase()].usd;
    } else if (data.ids && data.ids[tokenSymbol.toLowerCase()] && data.ids[tokenSymbol.toLowerCase()].usd) {
      // Alternative nested format
      price = data.ids[tokenSymbol.toLowerCase()].usd;
    } else {
      console.error('Unexpected API response format:', data);
      throw new Error('Invalid API response format');
    }
    
    // Expected format: { price: number, timestamp: number, signature?: string }
    const result: OracleResponse = {
      price: price,
      timestamp: data.timestamp || now,
      signature: data.signature
    };
    
    // Cache the result for 4.5 minutes (slightly less than the 5 minute expiry)
    const CACHE_TIME = 4.5 * 60 * 1000;
    oracleCache[cacheKey] = {
      data: result,
      expiresAt: now + CACHE_TIME
    };
    
    return result;
  } catch (error) {
    console.error(`Failed to fetch oracle price for ${tokenSymbol}:`, error);
    toast.error(`Failed to fetch price data for ${tokenSymbol}`);
    return null;
  }
};

export const checkOracleStatus = (lastUpdate: number): OracleStatus => {
  const now = Date.now();
  const FIVE_MINUTES = 5 * 60 * 1000;
  
  if (now - lastUpdate > FIVE_MINUTES) {
    return "expired";
  }
  
  return "active";
};

// For demonstration purposes - will be replaced with actual verification logic
export const verifyOracleResponse = (response: OracleResponse): boolean => {
  // This is a placeholder for future implementation of proof verification
  // In a real implementation, this would verify the signature against the data
  return !!response.signature || true;
};
