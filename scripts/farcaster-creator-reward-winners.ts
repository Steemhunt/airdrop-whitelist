import * as path from "path";
import { fetchFarcasterWinners } from "./libs/farcaster";

const API_URL = "https://api.farcaster.xyz/v1/creator-rewards-winner-history";
const OUTPUT_FILE = path.join(
  process.cwd(),
  "whitelist",
  "farcaster-creator-reward-winners.json"
);

interface CreatorWinner {
  fid: number;
  score: number;
  rank: number;
  rewardCents: number;
  username: string;
  walletAddress: string;
}

interface FormattedCreatorWinner {
  walletAddress: string;
  weight: number;
  fid: number;
  username: string;
  rank: number;
}

fetchFarcasterWinners<CreatorWinner, FormattedCreatorWinner>({
  apiUrl: API_URL,
  outputFile: OUTPUT_FILE,
  formatWinner: (winner) => ({
    walletAddress: winner.walletAddress,
    weight: winner.rewardCents,
    fid: winner.fid,
    username: winner.username,
    rank: winner.rank,
  }),
  logMessage: "Fetching Farcaster creator reward winners...",
});
