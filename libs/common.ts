import * as path from "path";
import * as fs from "fs";

export function getAirdropInfo(filename: string) {
  const AIRDROP_NAME = path.basename(filename, ".ts");
  const category = path.basename(path.dirname(filename));
  const WHITELIST_DIR = path.join(process.cwd(), "whitelist", category);
  const OUTPUT_FILE = path.join(WHITELIST_DIR, `${AIRDROP_NAME}.json`);

  if (!fs.existsSync(WHITELIST_DIR)) {
    fs.mkdirSync(WHITELIST_DIR, { recursive: true });
  }

  return { AIRDROP_NAME, OUTPUT_FILE, WHITELIST_DIR };
}
