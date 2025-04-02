import React from 'react';
import { PoolFactory } from './PoolFactory';
import { PoolList } from './PoolList';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function PoolDashboard() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pool Creation Section */}
        <div>
          <PoolFactory />
        </div>

        {/* Swap Section */}
        <Card>
          <CardHeader>
            <CardTitle>Swap Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Add swap component here */}
            <div className="text-center text-gray-500">
              Select a pool to start swapping
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pool List Section */}
      <div className="mt-8">
        <PoolList />
      </div>
    </div>
  );
} 