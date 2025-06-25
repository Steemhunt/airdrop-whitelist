import { createPublicClient, fallback, http, erc721Abi } from "viem";
import { mainnet } from "viem/chains";
import { RPCS } from "../../libs/rpcs";
import { getAirdropInfo } from "../../libs/common";
import { saveWhitelist } from "../../libs/formatter";

const config = {
  title: "HUNT Building NFT Holders",
  doc_url: "https://docs.hunt.town/token-and-point/main-building",
};

const { AIRDROP_NAME, OUTPUT_FILE } = getAirdropInfo(__filename);

const CHAIN_ID = 1; // Ethereum mainnet
const CONTRACT_ADDRESS = "0x0c9Bb1ffF512a5B4F01aCA6ad964Ec6D7fC60c96";

const client = createPublicClient({
  chain: mainnet,
  transport: fallback(
    RPCS.find((r) => r.id === CHAIN_ID)!.rpcs.map((r) => http(r))
  ),
});

async function main() {
  const holders: { [key: string]: number } = {};
  let burntCount = 0;

  const totalSupplyBI = await client.readContract({
    address: CONTRACT_ADDRESS,
    abi: erc721Abi,
    functionName: "totalSupply",
  });
  const totalSupply = Number(totalSupplyBI);

  const nextIdBI = await client.readContract({
    address: CONTRACT_ADDRESS,
    abi: [
      {
        inputs: [],
        name: "nextId",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "nextId",
  });
  const lastTokenId = Number(nextIdBI) - 1;

  console.log(
    `[${AIRDROP_NAME}] total supply is ${totalSupply}. Last token ID is ${lastTokenId}. Fetching owners...`
  );

  const batchSize = 200;
  const tokenIds = Array.from({ length: lastTokenId + 1 }, (_, i) => i);

  for (let i = 0; i < tokenIds.length; i += batchSize) {
    const batch = tokenIds.slice(i, i + batchSize);
    const contracts = batch.map((tokenId) => ({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: erc721Abi,
      functionName: "ownerOf",
      args: [BigInt(tokenId)],
    }));

    console.log(
      `[${AIRDROP_NAME}] fetching batch from tokenId ${batch[0]} to ${
        batch[batch.length - 1]
      }`
    );
    const results = await client.multicall({
      contracts,
      allowFailure: true,
    });

    results.forEach((result, index) => {
      if (result.status === "success") {
        const owner = result.result as `0x${string}`;
        if (owner) {
          holders[owner] = (holders[owner] || 0) + 1;
        }
      } else {
        burntCount++;
        // const tokenId = batch[index];
        // console.log(
        //   `[${AIRDROP_NAME}] could not fetch owner of tokenId ${tokenId}. It might be burnt.`
        // );
      }
    });
  }

  const wallets = Object.entries(holders).map(([walletAddress, weight]) => ({
    walletAddress,
    weight,
  }));

  console.log(
    `[${AIRDROP_NAME}] Last token ID: ${lastTokenId}, Fetched owners: ${totalSupply}, Burnt: ${burntCount}, Unique owners: ${
      Object.keys(holders).length
    }`
  );

  await saveWhitelist(OUTPUT_FILE, AIRDROP_NAME, wallets, config, "weight");
}

main();
