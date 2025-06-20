import * as fs from "fs/promises";
import * as path from "path";
import { getAddress } from "viem";

interface WalletInput {
  walletAddress?: string;
  weight?: number;
  [key: string]: any;
}

interface WalletOutput {
  walletAddress: string;
  weight: number;
  [key: string]: any;
}

export async function saveWhitelist(
  outputFile: string,
  airdropName: string,
  wallets: WalletInput[],
  sortKey?: string
) {
  // check if we have walletAddress set for every record, print index if not
  const missingWalletAddresses = wallets.findIndex((w) => !w.walletAddress);
  if (missingWalletAddresses !== -1) {
    console.log(
      `[${airdropName}] Missing walletAddress for record at index ${missingWalletAddresses}`,
      wallets[missingWalletAddresses]
    );
  }

  if (!wallets.every((w) => w.walletAddress)) {
    throw new Error(`[${airdropName}] All wallets must have a walletAddress`);
  }

  if (sortKey) {
    wallets.sort((a, b) => {
      if (a[sortKey] > b[sortKey]) {
        return -1;
      }
      if (a[sortKey] < b[sortKey]) {
        return 1;
      }
      return 0;
    });
  }

  const formattedWallets: WalletOutput[] = wallets.map((wallet) => {
    const weightValue = sortKey ? wallet[sortKey] : wallet.weight;
    let checksummedAddress = wallet.walletAddress || wallet.address;

    if (checksummedAddress) {
      try {
        checksummedAddress = getAddress(checksummedAddress);
      } catch (e) {
        console.error(
          `[${airdropName}] Invalid address found: ${checksummedAddress}`
        );
        throw e;
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { address, walletAddress, ...rest } = wallet;

    return {
      walletAddress: checksummedAddress!,
      weight: Number(weightValue) || 0,
      ...rest,
    };
  });

  const outputData = {
    walletsCount: formattedWallets.length,
    updatedAt: new Date().toISOString(),
    wallets: formattedWallets,
  };

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, JSON.stringify(outputData, null, 2));

  console.log(`\n[${airdropName}] Total wallets: ${wallets.length}`);
  console.log(
    `[${airdropName}] Successfully saved whitelist to ${path.relative(
      process.cwd(),
      outputFile
    )}`
  );

  await updateSummary(path.dirname(outputFile));
}

async function updateSummary(whitelistDir: string) {
  const summaryFilePath = path.join(whitelistDir, "summary.json");
  const summary: {
    [key: string]: { walletsCount: number; updatedAt: string };
  } = {};

  const files = await fs.readdir(whitelistDir);
  const jsonFiles = files.filter(
    (file) => path.extname(file) === ".json" && file !== "summary.json"
  );

  for (const file of jsonFiles) {
    try {
      const filePath = path.join(whitelistDir, file);
      const fileContent = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(fileContent);
      const airdropName = path.basename(file, ".json");

      if (data.walletsCount !== undefined && data.updatedAt) {
        summary[airdropName] = {
          walletsCount: data.walletsCount,
          updatedAt: data.updatedAt,
        };
      }
    } catch (error) {
      console.warn(`\n[Summary] Error processing file ${file}:`, error);
    }
  }

  const sortedKeys = Object.keys(summary).sort();
  const sortedSummary: {
    [key: string]: { walletsCount: number; updatedAt: string };
  } = {};
  for (const key of sortedKeys) {
    sortedSummary[key] = summary[key];
  }

  await fs.writeFile(summaryFilePath, JSON.stringify(sortedSummary, null, 2));
  console.log(
    `\n[Summary] Successfully saved summary to ${path.relative(
      process.cwd(),
      summaryFilePath
    )}`
  );
}
