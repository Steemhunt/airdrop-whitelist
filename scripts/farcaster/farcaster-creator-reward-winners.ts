import { fetchFarcasterWinners } from "../../libs/farcaster";
import { getAirdropInfo } from "../../libs/common";

const config = {
  title: "Creator Reward Winners",
  doc_url:
    "https://docs.farcaster.xyz/reference/warpcast/api#get-creator-reward-winners",
};

const { AIRDROP_NAME, OUTPUT_FILE } = getAirdropInfo(__filename);

const API_URL = "https://api.farcaster.xyz/v1/creator-rewards-winner-history";

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
  config,
  formatWinner: (winner) => ({
    walletAddress: winner.walletAddress,
    weight: winner.rewardCents,
    fid: winner.fid,
    username: winner.username,
    rank: winner.rank,
  }),
  logMessage: `Fetching creator reward winners...`,
  airdropName: AIRDROP_NAME,
  sortKey: "weight",
});
