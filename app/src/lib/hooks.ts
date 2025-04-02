import { useWallet } from "@/contexts/near";
import { getProviderByNetwork, view } from "@near-js/client";
import { parseNearAmount } from "@near-js/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NO_DEPOSIT, THIRTY_TGAS } from "../wallets/near-wallet";
import { queryClient } from "@/main";

export interface GuestBookMessage {
  premium: boolean;
  sender: string;
  text: string;
}
const ONE_YOCTO = "1";

export interface PoolInfo {
  token_contract: string;
  token_balance: string;
  usd_reserve: string;
  enabled: boolean;
  token_symbol: string;
  token_name: string;
  token_decimals: number;
  total_real_tokens_deposited: string;
  total_real_owner_tokens_withdrawn: string;
  oracle_price_timestamp_ms: number;
  oracle_price: string; // 24 decimals
}

export const CONTRACT = import.meta.env.VITE_POOLARIZE_CONTRACT;

export function useGetPools() {
  const { networkId, signedAccountId } = useWallet();

  return useQuery({
    queryKey: ["get-pools"],
    queryFn: async () => {
      const pools = await view<PoolInfo[]>({
        account: CONTRACT,
        method: "get_pools",
        deps: { rpcProvider: getProviderByNetwork(networkId) }
      });
      return pools;
    }
  });
}

export function useGetPool(token_contract: string) {
  const { networkId } = useWallet();

  return useQuery({
    queryKey: ["get-pool", token_contract],
    queryFn: async () => {
      const pools = await view<PoolInfo>({
        account: CONTRACT,
        method: "get_pool_info",
        args: { token_contract },
        deps: { rpcProvider: getProviderByNetwork(networkId) }
      });
      return pools;
    }
  });
}

export function useGetMainPool() {
  const { networkId } = useWallet();

  return useQuery({
    queryKey: ["get-main-pool"],
    queryFn: async () => {
      const pools = await view<PoolInfo>({
        account: CONTRACT,
        method: "get_main_pool",
        deps: { rpcProvider: getProviderByNetwork(networkId) }
      });
      return pools;
    }
  });
}

export function useGetNearBalance() {
  const { networkId, signedAccountId  } = useWallet();

  return useQuery({
    queryKey: ["balance_of", "near", ],
    queryFn: async () => {
      const pools = await view<PoolInfo>({
        account: CONTRACT,
        method: "get_main_pool",
        deps: { rpcProvider: getProviderByNetwork(networkId) }
      });
      return pools;
    }
  });
}
export function useGetTokenBalance(token_contract: string) {
  const { networkId,  signedAccountId, wallet } = useWallet();
// console.log("getting balance of ", token_contract, "for ", signedAccountId)
  return useQuery({
    queryKey: ["ft_balance_of", token_contract, signedAccountId],
    queryFn: async () => {
      console.log("getting balance of ", token_contract, "for ", signedAccountId)

      const balance = await view<string>({
        account: token_contract,
        method: "ft_balance_of",
        args: {account_id: signedAccountId },
        deps: { rpcProvider: getProviderByNetwork(networkId) }
      });
      return balance;
    }
  });
}

/// MUTATIONS

export function useAddPool() {
  const { networkId, wallet } = useWallet();

  return useMutation({
    onSuccess: () => {
      // Invalidate and refetch the "get_pools" query
      queryClient.invalidateQueries({ queryKey: ["get-pools"] });
    },
    mutationFn: async ({ token_contract }: { token_contract: string }) => {
      try {
        const result = wallet?.signAndSendTransaction({
          contractId: CONTRACT,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "add_pool",
                args: { token_contract },
                gas: THIRTY_TGAS,
                deposit: ONE_YOCTO
              }
            }
          ]
        });
        return result; // Make sure the function returns a value/promise
      } catch (error) {
        console.error("Error in mutation:", error);
        throw error;
      }
    }
  });
}

export function useRemovePool() {
  const { networkId, wallet } = useWallet();

  return useMutation({
    onSuccess: () => {
      // Invalidate and refetch the "get_pools" query
      queryClient.invalidateQueries({ queryKey: ["get-pools"] });
    },
    mutationFn: async ({ token_contract }: { token_contract: string }) => {
      try {
        const result = wallet?.signAndSendTransaction({
          contractId: CONTRACT,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "remove_pool",
                args: { token_contract },
                gas: THIRTY_TGAS,
                deposit: NO_DEPOSIT
              }
            }
          ]
        });
        return result; // Make sure the function returns a value/promise
      } catch (error) {
        console.error("Error in mutation:", error);
        throw error;
      }
    }
  });
}

export function useAddLiquidity() {
  const { networkId, wallet } = useWallet();

  return useMutation({
    onSuccess: () => {

      // queryClient.invalidateQueries({ queryKey: ["get-pools"] });
    },
    mutationFn: async ({ token_contract, amount_token }: { token_contract: string; amount_token: string }) => {
      try {

        const result = wallet?.signAndSendTransaction({
          contractId: CONTRACT,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "add_liquidity",
                args: { token_contract, amount_token },
                gas: THIRTY_TGAS,
                deposit: ONE_YOCTO
              }
            }
          ]
        });
        return result; // Make sure the function returns a value/promise
      } catch (error) {
        console.error("Error in mutation:", error);
        throw error;
      }
    }
  });
}

export function useRemoveLiquidity() {
  const { networkId, wallet } = useWallet();

  return useMutation({
    onSuccess: () => {

      // queryClient.invalidateQueries({ queryKey: ["get-pools"] });
    },
    mutationFn: async ({ token_contract, amount_token }: { token_contract: string; amount_token: string }) => {
      try {

        const result = wallet?.signAndSendTransaction({
          contractId: CONTRACT,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "remove_liquidity",
                args: { token_contract, amount_token },
                gas: THIRTY_TGAS,
                deposit: ONE_YOCTO
              }
            }
          ]
        });
        return result; // Make sure the function returns a value/promise
      } catch (error) {
        console.error("Error in mutation:", error);
        throw error;
      }
    }
  });
}


export function useEnablePool() {
  const { networkId, wallet } = useWallet();

  return useMutation({
    onSuccess: () => {

      // queryClient.invalidateQueries({ queryKey: ["get-pools"] });
    },
    mutationFn: async ({ token_contract }: { token_contract: string; }) => {
      try {

        const result = wallet?.signAndSendTransaction({
          contractId: CONTRACT,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "enable_pool",
                args: { token_contract },
                gas: THIRTY_TGAS,
                deposit: ONE_YOCTO
              }
            }
          ]
        });
        return result; // Make sure the function returns a value/promise
      } catch (error) {
        console.error("Error in mutation:", error);
        throw error;
      }
    }
  });
}

export function useDisablePool() {
  const { networkId, wallet } = useWallet();

  return useMutation({
    onSuccess: () => {

      // queryClient.invalidateQueries({ queryKey: ["get-pools"] });
    },
    mutationFn: async ({ token_contract }: { token_contract: string; }) => {
      try {

        const result = wallet?.signAndSendTransaction({
          contractId: CONTRACT,
          actions: [
            {
              type: "FunctionCall",
              params: {
                methodName: "disable_pool",
                args: { token_contract },
                gas: THIRTY_TGAS,
                deposit: ONE_YOCTO
              }
            }
          ]
        });
        return result; // Make sure the function returns a value/promise
      } catch (error) {
        console.error("Error in mutation:", error);
        throw error;
      }
    }
  });
}