import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { Network } from "alchemy-sdk";
import Moralis from "moralis";

process.env.MORALIS_API_KEY = "offline-test";

test("provider failures reject instead of reporting a successful whitelist update", async (t) => {
  const directory = await mkdtemp(path.join(tmpdir(), "whitelist-failure-"));
  const previousDirectory = process.cwd();
  process.chdir(directory);
  t.after(async () => {
    process.chdir(previousDirectory);
    await rm(directory, { recursive: true, force: true });
  });
  const error = new Error("Provider unavailable");
  const originalStart = Moralis.start;
  Moralis.start = async () => { throw error; };
  t.after(() => { Moralis.start = originalStart; });
  const { createErc20HoldersWhitelist } = await import("./erc20-holders");
  await assert.rejects(
    createErc20HoldersWhitelist(
      "scripts/mint-club/test-holders.ts",
      "0x1111111111111111111111111111111111111111",
      Network.BASE_MAINNET,
      { title: "Test holders", documentLink: "https://example.com" },
    ),
    error,
  );
});
