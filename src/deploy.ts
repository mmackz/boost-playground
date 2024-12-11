import { parseEther } from "viem";
import {
  DeployableOptions,
  EventActionPayload,
  BoostCore,
  ManagedBudget,
} from "@boostxyz/sdk";

export async function deployBoost(
  core: BoostCore,
  budget: ManagedBudget,
  actionPayload: EventActionPayload,
  options?: DeployableOptions
) {
  console.log("deploying boost");
  console.log(
    await budget.available("0xf3B2d0E4f2d8F453DBCc278b10e88b20d7f19f8D")
  );

  const action = core.EventAction(actionPayload);

  const boost = await core.createBoost({
    maxParticipants: 100n,
    budget,
    action,
    allowList: core.OpenAllowList(),
    incentives: [
      core.ERC20PeggedIncentive({
        asset: "0xf3B2d0E4f2d8F453DBCc278b10e88b20d7f19f8D",
        peg: "0x0000000000000000000000000000000000000000",
        reward: parseEther("0.5"),
        limit: 2n,
        manager: budget.assertValidAddress(),
      }),
    ],
  });

  console.log("boost deployed: ", boost.id);

  return boost;
}
