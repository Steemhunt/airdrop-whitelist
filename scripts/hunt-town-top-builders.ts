import fs from "fs";

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

  fs.writeFileSync(
    "whitelist/hunt-town-top-builders.json",
    JSON.stringify(fabricatedBuilders, null, 2)
  );
}

main();
