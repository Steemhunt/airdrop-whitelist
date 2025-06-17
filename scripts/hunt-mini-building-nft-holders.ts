import "dotenv/config";
import { getAirdropInfo } from "./libs/common";
import {
  Alchemy,
  GetOwnersForContractWithTokenBalancesResponse,
  Network,
} from "alchemy-sdk";
import fs from "fs";
import { getAddress } from "viem";

const { AIRDROP_NAME, OUTPUT_FILE, WHITELIST_DIR } = getAirdropInfo(__filename);

const CONTRACT_ADDRESS = "0x475f8E3eE5457f7B4AAca7E989D35418657AdF2a"; // Mini Building NFT
const TOKEN_ID = 0n;

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.BASE_MAINNET,
});

async function getMiniBuildingHolders() {
  const holders: { ownerAddress: string; tokenBalances: any[] }[] = [];

  let _pageKey: string | undefined = undefined;
  do {
    const resp: GetOwnersForContractWithTokenBalancesResponse =
      await alchemy.nft.getOwnersForContract(CONTRACT_ADDRESS, {
        withTokenBalances: true,
        pageKey: _pageKey,
      });

    _pageKey = resp.pageKey;
    holders.push(...resp.owners);
  } while (_pageKey);

  return holders
    .map((data) => {
      const token = data.tokenBalances.find(
        (t) => BigInt(t.tokenId) === TOKEN_ID
      );
      const balance = token ? parseInt(token.balance, 10) : 0;
      return {
        address: getAddress(data.ownerAddress),
        balance,
      };
    })
    .filter((h) => h.balance > 0);
}

async function main() {
  console.log(
    `[${AIRDROP_NAME}] Fetching holders for token ID ${TOKEN_ID} from contract ${CONTRACT_ADDRESS} on Base.`
  );

  const holders = await getMiniBuildingHolders();

  const result: { [key: string]: { weight: number } } = {};
  let totalBalance = 0;
  for (const holder of holders) {
    if (holder.balance > 0) {
      result[holder.address] = { weight: holder.balance };
      totalBalance += holder.balance;
    }
  }

  console.log(
    `[${AIRDROP_NAME}] Found ${
      Object.keys(result).length
    } unique holders with a total balance of ${totalBalance}.`
  );

  const sortedResult = Object.fromEntries(
    Object.entries(result).sort(([, a], [, b]) => b.weight - a.weight)
  );

  if (!fs.existsSync(WHITELIST_DIR)) {
    fs.mkdirSync(WHITELIST_DIR, { recursive: true });
  }
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sortedResult, null, 2));
  console.log(`[${AIRDROP_NAME}] whitelist saved to ${OUTPUT_FILE}`);
}

main();
