import "dotenv/config";
import {
  Alchemy,
  GetOwnersForContractWithTokenBalancesResponse,
  Network,
} from "alchemy-sdk";
import { getAirdropInfo } from "../../libs/common";
import { saveWhitelist } from "../../libs/formatter";

const config = {
  title: "HUNT Mini Building NFT Holders",
  doc_url: "https://docs.hunt.town/token-and-point/mini-building",
};

const { AIRDROP_NAME, OUTPUT_FILE } = getAirdropInfo(__filename);

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
        address: data.ownerAddress,
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

  const wallets = holders.map(({ address, balance }) => ({
    walletAddress: address,
    weight: balance,
  }));

  console.log(
    `[${AIRDROP_NAME}] Found ${
      wallets.length
    } unique holders with a total balance of ${wallets.reduce(
      (acc, h) => acc + h.weight,
      0
    )}.`
  );

  await saveWhitelist(OUTPUT_FILE, AIRDROP_NAME, wallets, config, "weight");
}

main();
