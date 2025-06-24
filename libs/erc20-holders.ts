import "dotenv/config";
import { Network } from "alchemy-sdk";
import { getAirdropInfo } from "./common";
import { saveWhitelist } from "./formatter";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

const MORALIS_API_KEY = process.env.MORALIS_API_KEY ?? "";

const ALCHEMY_TO_MORALIS_CHAIN_MAP: Record<string, EvmChain> = {
  [Network.ETH_MAINNET]: EvmChain.ETHEREUM,
  [Network.BASE_MAINNET]: EvmChain.BASE,
};

export interface HolderRow {
  holder: string; // holder address
  balance: string; // Human-readable balance, without 18 decimals
  label?: string | null;
}

export async function createErc20HoldersWhitelist(
  filename: string,
  tokenAddress: string,
  tokenSymbol: string,
  network: Network
) {
  const { AIRDROP_NAME, OUTPUT_FILE } = getAirdropInfo(filename);

  if (!MORALIS_API_KEY) throw new Error("MORALIS_API_KEY is not set.");

  const chain = ALCHEMY_TO_MORALIS_CHAIN_MAP[network];
  if (!chain) throw new Error(`Unknown network: ${network}`);

  try {
    console.log(`[${AIRDROP_NAME}]-fetching...`);
    await Moralis.start({ apiKey: MORALIS_API_KEY });

    const allHolders: HolderRow[] = [];
    let cursor: string | undefined = undefined;
    const holderLimit = 1000;
    do {
      const response = await Moralis.EvmApi.token.getTokenOwners({
        chain,
        tokenAddress,
        cursor,
      });

      const data = response.result;
      data.forEach((e: any) => {
        // NOTE: Exclude contract addresses
        if (e.isContract) return;

        if (
          e.ownerAddress.toLowerCase() ===
          "0x6563dF859733CbDca86dCCF33D912F104a0f4a9c".toLowerCase()
        ) {
          e.ownerAddressLabel = "Upbit: Cold Wallet";
        }

        allHolders.push({
          holder: e.ownerAddress,
          balance: e.balanceFormatted,
          label: e.ownerAddressLabel,
        });
      });
      cursor = response.pagination.cursor;
      console.log(`Fetched ${allHolders.length} holders...`);
    } while (cursor && cursor !== "" && allHolders.length < holderLimit);

    console.log(`Fetched ${allHolders.length} holders.`);

    const wallets = allHolders
      .slice(0, holderLimit)
      .map((holder) => {
        const weight = Number(holder.balance);
        return {
          walletAddress: holder.holder,
          weight,
          label: holder.label,
        };
      })
      .filter((w) => w.weight > 0);

    await saveWhitelist(OUTPUT_FILE, AIRDROP_NAME, wallets, "weight");
    console.log(`[${AIRDROP_NAME}]-done`);
  } catch (e) {
    console.error(e);
  }
}
