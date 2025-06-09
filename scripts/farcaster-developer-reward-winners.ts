import * as path from "path";
import { fetchFarcasterWinners } from "./libs/farcaster";

const API_URL = "https://api.farcaster.xyz/v1/developer-rewards-winner-history";
const OUTPUT_FILE = path.join(
  process.cwd(),
  "whitelist",
  "farcaster-developer-reward-winners.json"
);

interface DeveloperWinner {
  fid: number;
  domain: string;
  frameName: string;
  score: number;
  rank: number;
  rewardCents: number;
  walletAddress: string;
}

interface FormattedDeveloperWinner {
  walletAddress: string;
  weight: number;
  fid: number;
  domain: string;
  frameName: string;
  rank: number;
}

fetchFarcasterWinners<DeveloperWinner, FormattedDeveloperWinner>({
  apiUrl: API_URL,
  outputFile: OUTPUT_FILE,
  formatWinner: (winner) => ({
    walletAddress: winner.walletAddress,
    weight: winner.rewardCents,
    fid: winner.fid,
    domain: winner.domain,
    frameName: winner.frameName,
    rank: winner.rank,
  }),
  logMessage: "Fetching Farcaster developer reward winners...",
});
