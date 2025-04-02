import { useWallet } from "@/contexts/near";
import { getProviderByNetwork, view } from "@near-js/client";
import { parseNearAmount } from "@near-js/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NO_DEPOSIT, THIRTY_TGAS } from "../wallets/near-wallet";
import { queryClient } from "@/main";

export const CONTRACT = import.meta.env.VITE_POOLARIZE_CONTRACT;

export async function computeTokenOutput(
  usd_amount: string,
  token_contract: string
): Promise<string> {
  const { networkId } = useWallet();

  return await view<string>({
    account: CONTRACT,
    method: "compute_token_output",
    args: { usd_amount, token_contract },
    deps: { rpcProvider: getProviderByNetwork(networkId) }
  });
}

export async function computeUsdOutput(
  token_amount: string,
  token_contract: string
): Promise<string> {
  const { networkId } = useWallet();

  return await view<string>({
    account: CONTRACT,
    method: "compute_usd_output",
    args: { token_amount, token_contract },
    deps: { rpcProvider: getProviderByNetwork(networkId) }
  });
}

export async function computeTokenOutput2Step(
  token_amount: string,
  token_contract: string
): Promise<string> {
  const { networkId } = useWallet();

  return await view<string>({
    account: CONTRACT,
    method: "compute_token_output_2_step",
    args: { input_token_amount: token_amount, inut_token_contract: token_contract },
    deps: { rpcProvider: getProviderByNetwork(networkId) }
  });
}


export async function spotPriceUsd(
    token_contract: string
  ): Promise<string> {
    const { networkId } = useWallet();
  
    return await view<string>({
      account: CONTRACT,
      method: "spot_price_usd",
      args: { token_contract },
      deps: { rpcProvider: getProviderByNetwork(networkId) }
    });
  }
  