import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';

export function PoolFactory() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [initialLiquidity, setInitialLiquidity] = useState('');

  const handleCreatePool = async () => {
    try {
      // TODO: Implement pool creation logic
      console.log('Creating pool with token:', tokenAddress, 'and liquidity:', initialLiquidity);
    } catch (error) {
      console.error('Error creating pool:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create New Pool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tokenAddress">Token Address</Label>
            <Input
              id="tokenAddress"
              placeholder="Enter token contract address"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="initialLiquidity">Initial Liquidity</Label>
            <Input
              id="initialLiquidity"
              type="number"
              placeholder="Enter initial liquidity amount"
              value={initialLiquidity}
              onChange={(e) => setInitialLiquidity(e.target.value)}
            />
          </div>
          <Button 
            className="w-full"
            onClick={handleCreatePool}
            disabled={!tokenAddress || !initialLiquidity}
          >
            Create Pool
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 