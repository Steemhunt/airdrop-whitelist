import { getAirdropInfo } from "./libs/common";
import { saveWhitelist } from "./libs/formatter";

const { AIRDROP_NAME, OUTPUT_FILE } = getAirdropInfo(__filename);

async function main() {
  // return json is already sorted by reservedMiniBuildingCount
  const builders = (await fetch(
    "https://tip.hunt.town/api/snapshot/builders.json"
  ).then((res) => res.json())) as {
    fid: number;
    username: string;
    pfp_url: string;
    address: `0x${string}`;
    first: string[];
    second: string[];
    third: string[];
    reservedMiniBuildingCount: number;
  }[];

  const fabricatedBuilders = builders.map((builder) => ({
    walletAddress: builder.address,
    weight: builder.reservedMiniBuildingCount,
    fid: builder.fid,
    username: builder.username,
  }));

  await saveWhitelist(OUTPUT_FILE, AIRDROP_NAME, fabricatedBuilders, "weight");
}

main();
