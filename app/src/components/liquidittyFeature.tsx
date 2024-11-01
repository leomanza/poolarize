"use client"

import { useState } from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"

// Mock data for tokens, main token, and liquidity pools
const mainToken = { name: 'MTK', price: 10, balance: 1000 }
const tokens = [
  { name: 'ETH', price: 2000, balance: 5 },
  { name: 'USDC', price: 1, balance: 10000 },
  { name: 'DAI', price: 1, balance: 8000 },
]

const liquidityPools = [
  { name: 'MTK-ETH', liquidity: 1000000 },
  { name: 'MTK-USDC', liquidity: 800000 },
  { name: 'MTK-DAI', liquidity: 750000 },
]

export default function LiquidityFeature() {
  const [isNewPool, setIsNewPool] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4">
        <Button 
          variant={isNewPool ? "outline" : "default"} 
          onClick={() => setIsNewPool(false)}
        >
          Add Liquidity
        </Button>
        <Button 
          variant={isNewPool ? "default" : "outline"} 
          onClick={() => setIsNewPool(true)}
        >
          Create New Pool
        </Button>
      </div>
      {isNewPool ? (
        <NewPoolForm />
      ) : (
        <AddLiquidityForm />
      )}
    </div>
  )
}

function NewPoolForm() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="token" className="block text-sm font-medium text-[#DADDF1]">
          Select Token (pairs with {mainToken.name})
        </label>
        <Select.Root>
          <Select.Trigger className="inline-flex items-center justify-between rounded px-4 py-2 text-sm bg-[#081638] border border-[#DADDF1]/20 text-[#DADDF1] w-full" aria-label="Token">
            <Select.Value placeholder="Select token" />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-[#081638] border border-[#DADDF1]/20 rounded-md shadow-lg">
              <Select.Viewport className="p-2">
                {tokens.map((token) => (
                  <Select.Item key={token.name} value={token.name} className="relative flex items-center px-8 py-2 text-sm text-[#DADDF1] rounded-md hover:bg-[#DADDF1]/10 focus:bg-[#DADDF1]/10 radix-disabled:opacity-50 focus:outline-none select-none">
                    <Select.ItemText>{token.name}</Select.ItemText>
                    <Select.ItemIndicator className="absolute left-2  inline-flex items-center">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <div className="space-y-2">
        <label htmlFor="amount-main" className="block text-sm font-medium text-[#DADDF1]">
          Amount of {mainToken.name}
        </label>
        <input
          id="amount-main"
          type="number"
          placeholder={`Enter ${mainToken.name} amount`}
          className="w-full px-4 py-2 bg-[#081638] border border-[#DADDF1]/20 rounded text-[#DADDF1] placeholder-[#DADDF1]/50"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="amount-token" className="block text-sm font-medium text-[#DADDF1]">
          Amount of Selected Token
        </label>
        <input
          id="amount-token"
          type="number"
          placeholder="Enter token amount"
          className="w-full px-4 py-2 bg-[#081638] border border-[#DADDF1]/20 rounded text-[#DADDF1] placeholder-[#DADDF1]/50"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="oracle-url" className="block text-sm font-medium text-[#DADDF1]">
          Oracle URL
        </label>
        <input
          id="oracle-url"
          type="url"
          placeholder="Enter oracle URL for price updates"
          className="w-full px-4 py-2 bg-[#081638] border border-[#DADDF1]/20 rounded text-[#DADDF1] placeholder-[#DADDF1]/50"
        />
      </div>
      <Button>Create Pool</Button>
    </div>
  )
}

function AddLiquidityForm() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="pool" className="block text-sm font-medium text-[#DADDF1]">
          Select Pool
        </label>
        <Select.Root>
          <Select.Trigger className="inline-flex items-center justify-between rounded px-4 py-2 text-sm bg-[#081638] border border-[#DADDF1]/20 text-[#DADDF1] w-full" aria-label="Pool">
            <Select.Value placeholder="Select pool" />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-[#081638] border border-[#DADDF1]/20 rounded-md shadow-lg">
              <Select.Viewport className="p-2">
                {liquidityPools.map((pool) => (
                  <Select.Item key={pool.name} value={pool.name} className="relative flex items-center px-8 py-2 text-sm text-[#DADDF1] rounded-md hover:bg-[#DADDF1]/10 focus:bg-[#DADDF1]/10 radix-disabled:opacity-50 focus:outline-none select-none">
                    <Select.ItemText>{pool.name}</Select.ItemText>
                    <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <div className="space-y-2">
        <label htmlFor="amount-main" className="block text-sm font-medium text-[#DADDF1]">
          Amount of {mainToken.name}
        </label>
        <input
          id="amount-main"
          type="number"
          placeholder={`Enter ${mainToken.name} amount`}
          className="w-full px-4 py-2 bg-[#081638] border border-[#DADDF1]/20 rounded text-[#DADDF1] placeholder-[#DADDF1]/50"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="amount-token" className="block text-sm font-medium text-[#DADDF1]">
          Amount of Paired Token
        </label>
        <input
          id="amount-token"
          type="number"
          placeholder="Enter token amount"
          className="w-full px-4 py-2 bg-[#081638] border border-[#DADDF1]/20 rounded text-[#DADDF1] placeholder-[#DADDF1]/50"
        />
      </div>
      <Button>Add Liquidity</Button>
    </div>
  )
}