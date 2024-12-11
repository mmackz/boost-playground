import { config } from "@dotenvx/dotenvx";
config();

import type { Address, Hex, PrivateKeyAccount } from "viem";
import { privateKeyToAccount } from "viem/accounts";

export type Account = {
  account: Address;
  key: Hex;
  privateKey: PrivateKeyAccount;
};

export type Accounts = [Account];
export const accounts: Accounts = [
  {
    account: "0x0000c1E5C9d12c8c52eb319AF11dA44bb84779d2",
    key: process.env.ACCOUNT_1_KEY as Hex,
  },
].map((account) => {
  return {
    ...account,
    privateKey: privateKeyToAccount(account.key as Hex),
  } as {
    account: Address;
    key: Hex;
    privateKey: PrivateKeyAccount;
  };
}) as Accounts;
