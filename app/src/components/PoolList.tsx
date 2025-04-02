import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Pool {
  tokenAddress: string;
  virtualLiquidity: string;
  mainTokenLiquidity: string;
  isEnabled: boolean;
}

export function PoolList() {
  const [pools, setPools] = useState<Pool[]>([]);

  useEffect(() => {
    // TODO: Implement fetching pools from the contract
    const fetchPools = async () => {
      try {
        // Placeholder data
        const mockPools: Pool[] = [
          {
            tokenAddress: '0x123...abc',
            virtualLiquidity: '1000000',
            mainTokenLiquidity: '500000',
            isEnabled: true,
          },
          // Add more mock pools as needed
        ];
        setPools(mockPools);
      } catch (error) {
        console.error('Error fetching pools:', error);
      }
    };

    fetchPools();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Available Pools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pools.map((pool, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-sm">Pool Token: {pool.tokenAddress}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Virtual Liquidity:</span>
                  <span>{pool.virtualLiquidity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Main Token Liquidity:</span>
                  <span>{pool.mainTokenLiquidity}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={pool.isEnabled ? 'text-green-500' : 'text-red-500'}>
                    {pool.isEnabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 