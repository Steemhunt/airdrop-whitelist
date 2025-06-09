import * as path from "path";

export function getAirdropInfo(filename: string) {
  const AIRDROP_NAME = path.basename(filename, ".ts");
  const WHITELIST_DIR = path.join(process.cwd(), "whitelist");
  const OUTPUT_FILE = path.join(WHITELIST_DIR, `${AIRDROP_NAME}.json`);
  return { AIRDROP_NAME, OUTPUT_FILE, WHITELIST_DIR };
}
