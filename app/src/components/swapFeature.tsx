"use client"

import { useState } from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import { PoolInfo, useGetMainPool } from '@/lib/hooks'

// Mock data for tokens and main token
const mainToken = { name: 'MTK', price: 10, balance: 1000 }
// const tokens = [
//   { name: 'ETH', price: 2000, balance: 5 },
//   { name: 'USDC', price: 1, balance: 10000 },
//   { name: 'DAI', price: 1, balance: 8000 },
// ]

export default function SwapFeature({pools}: {pools: PoolInfo[]}) {
  const [step, setStep] = useState(1)
  const [fromToken, setFromToken] = useState(pools[0])
  const [amount, setAmount] = useState('')
  const mainPool = useGetMainPool();
  const handleNextStep = () => {
    setStep(2)
  }

  const handleSwap = () => {
    alert('Swap completed!')
    setStep(1)
    setAmount('')
  }

  return (
    <div className="space-y-4">
      {step === 1 ? (
        <>
          <div className="space-y-2">
            <label htmlFor="from-token" className="block text-sm font-medium text-[#DADDF1]">
              From
            </label>
            <Select.Root onValueChange={(value) => setFromToken(pools.find(t => t.token_name === value) || pools[0])}>
              <Select.Trigger className="inline-flex items-center justify-between rounded px-4 py-2 text-sm bg-[#081638] border border-[#DADDF1]/20 text-[#DADDF1] w-full" aria-label="From Token">
                <Select.Value placeholder="Select token" />
                <Select.Icon>
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="overflow-hidden bg-[#081638] border border-[#DADDF1]/20 rounded-md shadow-lg">
                  <Select.Viewport className="p-2">
                    {pools.map((pool) => (
                      <Select.Item key={pool.token_name} value={pool.token_name} className="relative flex items-center px-8 py-2 text-sm text-[#DADDF1] rounded-md hover:bg-[#DADDF1]/10 focus:bg-[#DADDF1]/10 radix-disabled:opacity-50 focus:outline-none select-none">
                        <Select.ItemText>{pool.token_name}</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
            {fromToken && (
              <div className="text-sm text-[#DADDF1]/80">
                Balance: {fromToken.balance} {fromToken.token_name}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium text-[#DADDF1]">
              Amount
            </label>
            <div className="relative">
              <input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 bg-[#081638] border border-[#DADDF1]/20 rounded text-[#DADDF1] placeholder-[#DADDF1]/50"
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[#3B82F6] hover:text-[#3B82F6]/80"
                onClick={() => setAmount(fromToken.balance.toString())}
              >
                Max
              </button>
            </div>
          </div>
          <div className="text-sm text-[#DADDF1]/80">
            ≈ ${(Number(amount) * fromToken.price).toFixed(2)}
          </div>
          <Button onClick={handleNextStep}>Next</Button>
        </>
      ) : (
        <>
          <div className="text-center space-y-2">
            <p className="text-[#DADDF1]">You will receive approximately:</p>
            <p className="text-2xl font-bold text-[#3B82F6]">{(Number(amount) * fromToken.price / mainToken.price).toFixed(6)} {mainToken.name}</p>
            <p className="text-sm text-[#DADDF1]/80">Price: 1 {mainPool.data?.token_name} = ${mainPool.data?.oracle_price}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={handleSwap}>Confirm Swap</Button>
          </div>
        </>
      )}
    </div>
  )
}