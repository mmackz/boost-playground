import {
  createPublicClient,
  createWalletClient,
  http,
  publicActions,
  walletActions,
} from "viem";
import { createConfig } from "@wagmi/core";
import { sepolia, baseSepolia, base } from "viem/chains";
import { accounts } from "./accounts.js";
import { BoostCore, BoostRegistry } from "@boostxyz/sdk";


const account = accounts[0].privateKey;

export const publicClient = createPublicClient({
  transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
  chain: sepolia,
})
  .extend(publicActions)
  .extend(walletActions);

export const baseSepoliaClient = createPublicClient({
  transport: http("https://sepolia.base.org"),
  chain: baseSepolia,
})
  .extend(publicActions)
  .extend(walletActions);

export const baseClient = createPublicClient({
  transport: http("https://base.llamarpc.com"),
  chain: base,
})
  .extend(publicActions)
  .extend(walletActions);

export const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http("https://ethereum-sepolia-rpc.publicnode.com"),
});

export const config = createConfig({
  chains: [sepolia, baseSepolia, base],
  client: ({ chain }) => {
    switch (chain.id) {
      case sepolia.id:
        return publicClient;
      case baseSepolia.id:
        return baseSepoliaClient;
      case base.id:
        return baseClient;
      default:
        return publicClient;
    }
  },
});

export const core = new BoostCore({ config, account });
export const registry = new BoostRegistry({ config, account });
