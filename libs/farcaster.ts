import axios from "axios";
import { saveWhitelist } from "./formatter";

interface ApiResponse<T> {
  result: {
    history: {
      winners: T[];
    };
  };
  next?: {
    cursor: string;
  };
}

interface FetchWinnersParams<T, U> {
  apiUrl: string;
  outputFile: string;
  config: { title: string; doc_url: string };
  formatWinner: (winner: T) => U;
  logMessage: string;
  airdropName: string;
  sortKey: keyof U;
}

export async function fetchFarcasterWinners<
  RawWinner,
  FormattedWinner extends { walletAddress: string; [key: string]: any }
>({
  apiUrl,
  outputFile,
  config,
  formatWinner,
  logMessage,
  airdropName,
  sortKey,
}: FetchWinnersParams<RawWinner, FormattedWinner>) {
  let allWinners: FormattedWinner[] = [];
  let cursor: string | null = null;
  let page = 1;

  console.log(`[${airdropName}] ${logMessage}`);

  try {
    do {
      const response: any = await axios.get<ApiResponse<RawWinner>>(apiUrl, {
        params: {
          cursor: cursor,
        },
      });

      const { data }: any = response;
      const winners = data.result.history.winners;

      if (winners && winners.length > 0) {
        const formattedWinners = winners.map(formatWinner);
        allWinners = allWinners.concat(formattedWinners);
        console.log(
          `[${airdropName}] Fetched page ${page}: ${winners.length} winners`
        );
      }

      cursor = data.next?.cursor ?? null;
      page++;
    } while (cursor);

    console.log(
      `\n[${airdropName}] Total winners fetched: ${allWinners.length}`
    );

    const validWinners = allWinners.filter((winner) => winner.walletAddress);
    const invalidWinnersCount = allWinners.length - validWinners.length;

    if (invalidWinnersCount > 0) {
      console.log(
        `\n[${airdropName}] Removed ${invalidWinnersCount} winners with no wallet address`
      );
    }

    validWinners.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return -1;
      }
      if (a[sortKey] > b[sortKey]) {
        return 1;
      }
      return 0;
    });

    await saveWhitelist(
      outputFile,
      airdropName,
      validWinners,
      config,
      sortKey as string
    );
  } catch (error) {
    console.error(`[${airdropName}] An error occurred:`, error);
  }
}
