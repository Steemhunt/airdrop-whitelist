# 🎁 Airdrop Whitelist

This repository maintains airdrop whitelists for the [Mint Club Airdrop Tool](https://mint.club/airdrop/create), along with scripts to update them.

## ✅ Whitelists Maintained

- [x] **List summary** ([✅ summary file](whitelist/summary.json))

<!-- WHITELIST_TABLE_START -->
### Farcaster

- [x] Farcaster Creator Reward Winners ([📄 docs](https://docs.farcaster.xyz/reference/warpcast/api#get-creator-reward-winners), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/farcaster/farcaster-creator-reward-winners.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/farcaster/farcaster-creator-reward-winners.ts))
- [x] Farcaster Developer Reward Winners ([📄 docs](https://docs.farcaster.xyz/reference/warpcast/api#get-developer-reward-winners), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/farcaster/farcaster-developer-reward-winners.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/farcaster/farcaster-developer-reward-winners.ts))
- [x] Farcaster Pro Subscribers ([📄 docs](https://farcaster.xyz/mvr/0xc53f3047), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/farcaster/farcaster-pro-subscribers.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/farcaster/farcaster-pro-subscribers.ts))

### Hunt Town

- [x] HUNT Building NFT Holders ([📄 docs](https://docs.hunt.town/token-and-point/main-building), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-building-nft-holders.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-building-nft-holders.ts))
- [x] HUNT Mini Building NFT Holders ([📄 docs](https://docs.hunt.town/token-and-point/mini-building), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-mini-building-nft-holders.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-mini-building-nft-holders.ts))
- [x] HUNT Token Holders (Base) ([📄 docs](https://docs.hunt.town/token-and-point/hunt-erc20), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-token-holders-base.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-token-holders-base.ts))
- [x] HUNT Token Holders (Mainnet) ([📄 docs](https://docs.hunt.town/token-and-point/hunt-erc20), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-token-holders-mainnet.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-token-holders-mainnet.ts))
- [x] Hunt Town Top Builders (by total claps received) ([📄 docs](https://docs.hunt.town/token-and-point/hunt-tip-farcaster), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-town-top-builders-by-score.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-town-top-builders-by-score.ts))
- [x] Hunt Town Top Builders (by mini-building grants) ([📄 docs](https://docs.hunt.town/token-and-point/hunt-tip-farcaster), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-town-top-builders.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-town-top-builders.ts))
- [x] Hunt Town Top Clappers ([📄 docs](https://docs.hunt.town/token-and-point/hunt-tip-farcaster), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-town-top-clappers.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-town-top-clappers.ts))

### Mint Club

- [x] MT Token Holders (Base) ([📄 docs](https://docs.mint.club/mt), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/mint-club/mt-token-holders-base.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/mint-club/mt-token-holders-base.ts))

<!-- WHITELIST_TABLE_END -->

## 🔄 Updating Whitelists

You can update all whitelists at once or update a specific list.

### Update All Lists

To update all whitelists, run the following command, which will execute all the scripts in the `scripts` folder and its subfolders:

```bash
bun run update-all
```

## 📝 Whitelist JSON Format

Each file has the following JSON structure.

```json
{
  "walletsCount": 2,
  "updatedAt": "2025-06-17T12:34:56.789Z",
  "wallets": [
    {
      "walletAddress": "0x1234567890123456789012345678901234567890",
      "weight": 50,
      "fid": 123,
      "username": "userA",
      "rank": 1
    },
    {
      "walletAddress": "0x0987654321098765432109876543210987654321",
      "fid": 456,
      "username": "userB",
      "rank": 2
    }
  ]
}
```

- `walletsCount`: The total number of whitelisted wallets.
- `updatedAt`: The timestamp when the whitelist was last updated.
- `wallets`: An array of whitelisted wallet objects.
  - `walletAddress`: The wallet address.
  - `weight (optional)`: The weight of the wallet. This can be used to calculate the airdrop amount.
  - `... (optional)`: You can include other informational fields like `fid`, `username`, `rank`, etc., to provide additional context.

## 📜 Whitelist Summary

The `whitelist/summary.json` file provides a summary of all available whitelists. It contains a nested object where the keys are categories, and the values are objects containing the whitelists in that category. This file is automatically updated when you run the update scripts.

Here is an example of the `summary.json` format:

```json
{
  "farcaster": {
    "farcaster-creator-reward-winners": {
      "title": "Farcaster Creator Reward Winners (previous week)",
      "doc_url": "https://docs.farcaster.xyz/reference/warpcast/api#get-creator-reward-winners",
      "walletsCount": 2989,
      "updatedAt": "2025-06-17T06:43:50.506Z",
      "script": "https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/farcaster/farcaster-creator-reward-winners.ts",
      "endpoint": "https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/farcaster/farcaster-creator-reward-winners.json"
    }
  }
}
```
