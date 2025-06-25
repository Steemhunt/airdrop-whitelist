import { getAirdropInfo } from "../../libs/common";
import { saveWhitelist } from "../../libs/formatter";

const config = {
  title: "Top Clappers",
  doc_url: "https://docs.hunt.town/token-and-point/hunt-tip-farcaster",
};

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

  const whitelist = tippers.map(({ fid, username, address, tipped }) => ({
    walletAddress: address,
    weight: tipped,
    fid,
    username,
  }));

  await saveWhitelist(OUTPUT_FILE, AIRDROP_NAME, whitelist, config, "weight");
}

main();
