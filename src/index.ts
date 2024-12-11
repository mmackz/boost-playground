import { eventActionPayload } from "./actions/zora-mint";
import { core } from "./config";
import { deployBoost } from "./deploy";

(async () => {
  const budget = core.ManagedBudget(
    "0x072c62507b8683fe70c2ad442f01fbe0bea3433e"
  );

  await deployBoost(core, budget, eventActionPayload)
})();
