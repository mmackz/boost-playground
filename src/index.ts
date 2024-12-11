import { Address } from "viem";
import { eventActionPayload } from "./actions/zora-mint";
import { core } from "./config";
import { deployBoost } from "./deploy";

(async () => {
  const budget = core.ManagedBudget(process.env.BUDGET_ADDRESS as Address);

  await deployBoost(core, budget, eventActionPayload)
})();
