import { fetchFarcasterWinners } from "../../libs/farcaster";
import { getAirdropInfo } from "../../libs/common";

const config = {
  title: "Developer Reward Winners",
  doc_url:
    "https://docs.farcaster.xyz/reference/warpcast/api#get-developer-reward-winners",
};

const { AIRDROP_NAME, OUTPUT_FILE } = getAirdropInfo(__filename);

const API_URL = "https://api.farcaster.xyz/v1/developer-rewards-winner-history";

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
  config,
  formatWinner: (winner) => ({
    walletAddress: winner.walletAddress,
    weight: winner.rewardCents,
    fid: winner.fid,
    domain: winner.domain,
    frameName: winner.frameName,
    rank: winner.rank,
  }),
  logMessage: `Fetching developer reward winners...`,
  airdropName: AIRDROP_NAME,
  sortKey: "weight",
});
