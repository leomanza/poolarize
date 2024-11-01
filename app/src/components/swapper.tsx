"use client"

import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Button } from "@/components/ui/button"
import SwapFeature from '@/components/swapFeature'
import LiquidityFeature from '@/components/liquidittyFeature'
import { Link } from 'lucide-react'

export default function Swapper() {
  return (
    <div className="min-h-screen min-v-screen text-white">
      <div className="container mx-auto px-4 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#00FFFF]">Poolarize</h1>
            <p className="text-xl mb-8 text-[#DADDF1]">The next generation decentralized AMM Protocol for Capital-Efficient Token Swaps</p>
            <ul className="space-y-4 mb-8 text-[#DADDF1]">
              <FeatureItem>Seamless cross-token swaps centered on one main token.</FeatureItem>
              <FeatureItem>Only main token liquidity required; virtualized balances for others.</FeatureItem>
              <FeatureItem>Real-time USD prices with auto-disable on price gaps.</FeatureItem>
            </ul>
            <div>
            {/* <Button asChild>
              <Link to="/login">Connect NEAR Account</Link>
            </Button> */}
            </div>
          </div>
          <div className="lg:w-1/2 lg:mt-0 mt-12">
            <div className="bg-gradient-to-b from-[#0A1F4D] to-[#081638] border border-[#DADDF1]/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2 text-[#3B82F6]">Start Trading</h2>
              <p className="text-[#DADDF1] mb-6">Swap tokens or manage liquidity</p>
              <Tabs.Root defaultValue="swap" className="w-full">
                <Tabs.List className="flex mb-6" aria-label="Manage your account">
                  <Tabs.Trigger
                    className="px-4 py-2 flex-1 text-center bg-[#0F3EB7]/20 first:rounded-l-md last:rounded-r-md hover:bg-[#0F3EB7]/30 data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white transition"
                    value="swap"
                  >
                    Swap
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    className="px-4 py-2 flex-1 text-center bg-[#0F3EB7]/20 first:rounded-l-md last:rounded-r-md hover:bg-[#0F3EB7]/30 data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white transition"
                    value="liquidity"
                  >
                    Liquidity
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="swap">
                  <SwapFeature />
                </Tabs.Content>
                <Tabs.Content value="liquidity">
                  <LiquidityFeature />
                </Tabs.Content>
              </Tabs.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center space-x-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-[#3B82F6]"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span>{children}</span>
    </li>
  )
}