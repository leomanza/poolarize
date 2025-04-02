"use client";

import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import SwapFeature from "@/components/swapFeature";
import LiquidityFeature from "@/components/liquidittyFeature";
import { Link } from "lucide-react";
import { PoolInfo, useGetTokenBalance } from "@/lib/hooks";

export default function Swapper({ pools }: { pools: PoolInfo[] }) {
  console.log("pools", pools);
  const balance = useGetTokenBalance(pools[0].token_contract);
  return (
    <div className="min-v-screen min-h-screen text-white">
      {balance.isFetched ? balance.data : "0"}
      <div className="container mx-auto px-4 py-12 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="mb-12 lg:mb-0 lg:w-1/2 lg:pr-12">
            <h1 className="mb-6 bg-gradient-to-r from-[#3B82F6] to-[#00FFFF] bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
              Poolarize
            </h1>
            <p className="mb-8 text-xl text-[#DADDF1]">
              The next generation decentralized AMM Protocol for
              Capital-Efficient Token Swaps
            </p>
            <ul className="mb-8 space-y-4 text-[#DADDF1]">
              <FeatureItem>
                Seamless cross-token swaps centered on one main token.
              </FeatureItem>
              <FeatureItem>
                Only main token liquidity required; virtualized balances for
                others.
              </FeatureItem>
              <FeatureItem>
                Real-time USD prices with auto-disable on price gaps.
              </FeatureItem>
            </ul>
            <div>
              {/* <Button asChild>
              <Link to="/login">Connect NEAR Account</Link>
            </Button> */}
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:w-1/2">
            <div className="rounded-lg border border-[#DADDF1]/20 bg-gradient-to-b from-[#0A1F4D] to-[#081638] p-6">
              <h2 className="mb-2 text-2xl font-bold text-[#3B82F6]">
                Start Trading
              </h2>
              <p className="mb-6 text-[#DADDF1]">
                Swap tokens or manage liquidity
              </p>
              <Tabs.Root defaultValue="swap" className="w-full">
                <Tabs.List
                  className="mb-6 flex"
                  aria-label="Manage your account"
                >
                  <Tabs.Trigger
                    className="flex-1 bg-[#0F3EB7]/20 px-4 py-2 text-center transition first:rounded-l-md last:rounded-r-md hover:bg-[#0F3EB7]/30 data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white"
                    value="swap"
                  >
                    Swap
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    className="flex-1 bg-[#0F3EB7]/20 px-4 py-2 text-center transition first:rounded-l-md last:rounded-r-md hover:bg-[#0F3EB7]/30 data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white"
                    value="liquidity"
                  >
                    Liquidity
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="swap">
                  <SwapFeature pools={pools} />
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
  );
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
  );
}
