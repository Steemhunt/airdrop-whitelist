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
  weight?: number;
  [key: string]: any;
}

interface Config {
  title: string;
  documentLink: string;
}

export async function saveWhitelist(
  outputFile: string,
  airdropName: string,
  wallets: WalletInput[],
  config: Config,
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

    const result: WalletOutput = {
      walletAddress: checksummedAddress!,
      ...rest,
    };

    if (sortKey !== undefined || wallet.weight !== undefined) {
      result.weight = Number(weightValue) || 0;
    }

    return result;
  });

  const outputData = {
    ...config,
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

  await updateSummary();
}

export async function updateSummary() {
  const whitelistRoot = path.join(process.cwd(), "whitelist");
  const summaryFilePath = path.join(whitelistRoot, "summary.json");
  const summary: {
    [category: string]: {
      [airdrop: string]: {
        title: string;
        documentLink: string;
        isWeighted: boolean;
        walletsCount: number;
        updatedAt: string;
        script: string;
        endpoint: string;
      };
    };
  } = {};
  let readmeWhitelists = "";

  const allCategories = (
    await fs.readdir(whitelistRoot, { withFileTypes: true })
  )
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const order = ["farcaster", "hunt-town", "mint-club"];
  const categories = allCategories.sort((a, b) => {
    const indexA = order.indexOf(a);
    const indexB = order.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  for (const category of categories) {
    summary[category] = {};
    const categoryDir = path.join(whitelistRoot, category);
    const files = (await fs.readdir(categoryDir))
      .filter(
        (file) => path.extname(file) === ".json" && file !== "summary.json"
      )
      .sort((a, b) => a.localeCompare(b));

    if (files.length === 0) continue;

    const formattedCategory = category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    readmeWhitelists += `### ${formattedCategory}\n\n`;

    for (const file of files) {
      try {
        const filePath = path.join(categoryDir, file);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileContent);
        const airdropName = path.basename(file, ".json");
        const endpoint = `https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/${category}/${file}`;
        const script = `https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/${category}/${airdropName}.ts`;
        const isWeighted =
          data.wallets?.some((w: any) => w.weight !== undefined) ?? false;

        if (data.walletsCount !== undefined && data.updatedAt) {
          summary[category][airdropName] = {
            title: data.title,
            documentLink: data.documentLink,
            isWeighted,
            walletsCount: data.walletsCount,
            updatedAt: data.updatedAt,
            script,
            endpoint,
          };

          const links = [];
          if (data.documentLink) {
            links.push(`[📄 docs](${data.documentLink})`);
          }
          links.push(`[✅ whitelist](${endpoint})`);
          links.push(`[⚙️ script](${script})`);
          readmeWhitelists += `- [x] ${data.title} (${links.join(", ")})\n`;
        }
      } catch (error) {
        console.warn(`\n[Summary] Error processing file ${file}:`, error);
      }
    }
    readmeWhitelists += `\n`;
  }

  await fs.writeFile(summaryFilePath, JSON.stringify(summary, null, 2));
  console.log(
    `\n[Summary] Successfully saved summary to ${path.relative(
      process.cwd(),
      summaryFilePath
    )}`
  );

  const readmePath = path.join(process.cwd(), "README.md");
  const readmeContent = await fs.readFile(readmePath, "utf-8");
  const newReadmeContent = readmeContent.replace(
    /(<!-- WHITELIST_TABLE_START -->)([\s\S]*)(<!-- WHITELIST_TABLE_END -->)/,
    `$1\n${readmeWhitelists}$3`
  );
  await fs.writeFile(readmePath, newReadmeContent);
  console.log(`\n[Summary] Successfully updated README.md`);
}
