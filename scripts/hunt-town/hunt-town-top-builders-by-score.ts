import { isAddress } from "viem";
import { getAirdropInfo } from "../../libs/common";
import { saveWhitelist } from "../../libs/formatter";

const config = {
  title: "Top Builders (by total claps received)",
  documentLink: "https://docs.hunt.town/token-and-point/hunt-tip-farcaster",
};

const { AIRDROP_NAME, OUTPUT_FILE } = getAirdropInfo(__filename);

async function main() {
  // Returns top builders by total tip received, limited to top 1,000 builders
  const builders = (await fetch(
    "https://tip.hunt.town/api/snapshot/builders-by-score.json"
  ).then((res) => res.json())) as {
    fid: number;
    username: string;
    primaryAddress: string;
    totalTipReceived: string;
  }[];

  const whitelist = builders
    .map(({ fid, username, primaryAddress, totalTipReceived }) => ({
      walletAddress: primaryAddress,
      weight: Number(totalTipReceived),
      fid,
      username,
    }))
    // Filter out if primaryAddress is not valid address or null
    .filter((w) => w.walletAddress && isAddress(w.walletAddress)); //

  await saveWhitelist(OUTPUT_FILE, AIRDROP_NAME, whitelist, config, "weight");
}

main();
