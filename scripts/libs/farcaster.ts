import axios from "axios";
import * as fs from "fs/promises";
import * as path from "path";

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

export async function fetchFarcasterWinners<
  RawWinner,
  FormattedWinner extends Record<string, any>
>({
  apiUrl,
  outputFile,
  formatWinner,
  logMessage,
  airdropName,
  sortKey,
}: {
  apiUrl: string;
  outputFile: string;
  formatWinner: (winner: RawWinner) => FormattedWinner;
  logMessage: string;
  airdropName: string;
  sortKey: keyof FormattedWinner;
}) {
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

    allWinners.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return -1;
      }
      if (a[sortKey] > b[sortKey]) {
        return 1;
      }
      return 0;
    });

    await fs.mkdir(path.dirname(outputFile), { recursive: true });
    await fs.writeFile(outputFile, JSON.stringify(allWinners, null, 2));

    console.log(
      `[${airdropName}] Successfully saved whitelist to ${outputFile}`
    );
  } catch (error) {
    console.error(`[${airdropName}] An error occurred:`, error);
  }
}
