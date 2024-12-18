import { 
  FilterType, 
  ActionStep, 
  SignatureType, 
  PrimitiveType,
  ActionClaimant
} from "@boostxyz/sdk";
import signatures from "@boostxyz/signatures" assert { type: "json" };
import { Hex, toHex } from "viem";
import { zora } from "viem/chains";

const targetContract = "0x777777722d078c97c6ad07d9f36801e653e356ae"; // Zora TimedSalesStrategy
const mintSelector = signatures.functions.selectors[
  "mint(address mintTo,uint256 quantity,address collection,uint256 tokenId,address mintReferral,string comment)"
] as Hex;

const commonParams = {
  chainid: zora.id,
  signature: mintSelector,
  signatureType: SignatureType.FUNC,
  targetContract: targetContract,
} as const;

// Any mint on Zora TimedSalesStrategy contract
const collectionActionStep: ActionStep = {
  ...commonParams,
  actionParameter: {
    filterType: FilterType.EQUAL,
    fieldType: PrimitiveType.ADDRESS,
    fieldIndex: 2, // collection
    filterData: "0x3263023c87502f1676f00df902b1237f93da26a9",
  },
};

const tokenIdActionStep: ActionStep = {
  ...commonParams,
  actionParameter: {
    filterType: FilterType.EQUAL,
    fieldType: PrimitiveType.UINT,
    fieldIndex: 3, // tokenId
    filterData: toHex(1, { size: 1 }),
  },
};

const quantityActionStep: ActionStep = {
  ...commonParams,
  actionParameter: {
    filterType: FilterType.GREATER_THAN_OR_EQUAL,
    fieldType: PrimitiveType.UINT,
    fieldIndex: 1, // quantity
    filterData: toHex(1, { size: 1 }),
  },
};

const actionClaimant: ActionClaimant = {
  ...commonParams,
  fieldIndex: 0, // mintTo
};

export const eventActionPayload = {
  actionClaimant,
  actionSteps: [quantityActionStep],
};
