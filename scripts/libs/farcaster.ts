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

export async function fetchFarcasterWinners<RawWinner, FormattedWinner>({
  apiUrl,
  outputFile,
  formatWinner,
  logMessage,
}: {
  apiUrl: string;
  outputFile: string;
  formatWinner: (winner: RawWinner) => FormattedWinner;
  logMessage: string;
}) {
  let allWinners: FormattedWinner[] = [];
  let cursor: string | null = null;
  let page = 1;

  console.log(logMessage);

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
        console.log(`Fetched page ${page}: ${winners.length} winners`);
      }

      cursor = data.next?.cursor ?? null;
      page++;
    } while (cursor);

    console.log(`\nTotal winners fetched: ${allWinners.length}`);

    await fs.mkdir(path.dirname(outputFile), { recursive: true });
    await fs.writeFile(outputFile, JSON.stringify(allWinners, null, 2));

    console.log(`Successfully saved whitelist to ${outputFile}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
