// to be implemented when public list is available
import { saveWhitelist } from "../../libs/formatter";
import axios from "axios";

export const config = {
  title: "Pro Subscribers",
  doc_url: "https://farcaster.xyz/mvr/0xc53f3047",
};

const URLS = [
  "http://ham.cooking/10k/final_10k_w_context.csv",
  "https://ham.cooking/10k/above_10k_w_context.csv",
];

type User = {
  fid: number;
  username: string;
  walletAddress: string;
};

// Thanks to https://stackoverflow.com/a/7431565/4582373
function csvToArray(text: string): string[][] {
  let p = "",
    row: string[] = [""],
    ret: string[][] = [row],
    i = 0,
    r = 0,
    s = !0;
  for (let l of text) {
    if ('"' === l) {
      if (s && l === p) row[i] += l;
      s = !s;
    } else if ("," === l && s) l = row[++i] = "";
    else if ("\n" === l && s) {
      if ("\r" === p) row[i] = row[i].slice(0, -1);
      ret.push((row = [(l = "")]));
      i = 0;
      r++;
    } else row[i] += l;
    p = l;
  }
  return ret;
}

async function fetchUsers(url: string): Promise<User[]> {
  const response = await axios.get(url);
  const csvData = response.data;
  const rows = csvToArray(csvData);

  const header = rows[0];
  const fidIndex = header.indexOf("fid");
  const usernameIndex = header.indexOf("username");
  const addressIndex = header.indexOf("address");

  if (fidIndex === -1 || usernameIndex === -1 || addressIndex === -1) {
    throw new Error(`Missing required columns in ${url}`);
  }

  return rows
    .slice(1)
    .map((row) => {
      const fid = parseInt(row[fidIndex], 10);
      const username = row[usernameIndex];
      const walletAddress = row[addressIndex];

      if (!walletAddress) {
        return null;
      }

      return {
        fid,
        username,
        walletAddress,
      };
    })
    .filter((user) => user !== null) as User[];
}

async function run() {
  let allUsers: User[] = [];

  for (const url of URLS) {
    try {
      const users = await fetchUsers(url);
      allUsers = allUsers.concat(users);
    } catch (e) {
      console.error(`Failed to fetch from ${url}`, e);
    }
  }

  const uniqueUsers = Array.from(
    new Map(allUsers.map((user) => [user.walletAddress, user])).values()
  );

  uniqueUsers.sort((a, b) => a.fid - b.fid);

  await saveWhitelist(
    "whitelist/farcaster/farcaster-pro-subscribers.json",
    config.title,
    uniqueUsers,
    config
  );
}

run();
