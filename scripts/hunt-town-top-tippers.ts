import fs from "fs";

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

  fs.writeFileSync(
    "whitelist/hunt-town-top-tippers.json",
    JSON.stringify(fabricatedBuilders, null, 2)
  );
}

main();
