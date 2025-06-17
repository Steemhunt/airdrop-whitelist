import { getAirdropInfo } from "./libs/common";
import { saveWhitelist } from "./libs/formatter";

const { AIRDROP_NAME, OUTPUT_FILE } = getAirdropInfo(__filename);

async function main() {
  const tippers = (await fetch(
    "https://tip.hunt.town/api/snapshot/tippers.json"
  ).then((res) => res.json())) as {
    fid: number;
    username: string;
    pfp_url: string;
    address: `0x${string}`;
    tipped: number;
  }[];

  // weight by tipped amount
  const fabricatedBuilders = tippers.map((tipper) => ({
    walletAddress: tipper.address,
    weight: tipper.tipped,
    fid: tipper.fid,
    username: tipper.username,
  }));

  await saveWhitelist(OUTPUT_FILE, AIRDROP_NAME, fabricatedBuilders, "weight");
}

main();
