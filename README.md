# 🎁 Airdrop Whitelist

This repository maintains airdrop whitelists for the [Mint Club Airdrop Tool](https://mint.club/airdrops), along with scripts to update them.

## ✅ Whitelists Maintained

- [x] **List summary** ([✅ summary file](whitelist/summary.json))
- [ ] Farcastser Pro Subscribers ([⚙️ updating script](scripts/farcaster/farcaster-pro-subscribers.ts), [✅ whitelist](whitelist/farcaster/farcaster-pro-subscribers.json))
<!-- WHITELIST_TABLE_START -->
### Mint Club

- [x] MT token holders (Base, excluding contract addresses) ([📄 docs](https://docs.mint.club/mt), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/mint-club/mt-token-holders-base.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/mint-club/mt-token-holders-base.ts))

### Farcaster

- [x] Farcaster Developer Reward Winners (previous week) ([📄 docs](https://docs.farcaster.xyz/reference/warpcast/api#get-developer-reward-winners), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/farcaster/farcaster-developer-reward-winners.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/farcaster/farcaster-developer-reward-winners.ts))
- [x] Farcaster Creator Reward Winners (previous week) ([📄 docs](https://docs.farcaster.xyz/reference/warpcast/api#get-creator-reward-winners), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/farcaster/farcaster-creator-reward-winners.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/farcaster/farcaster-creator-reward-winners.ts))

### Hunt Town

- [x] Hunt Town Top Builders (previous month) ([📄 docs](https://docs.hunt.town/token-and-point/hunt-tip-farcaster), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-town-top-builders.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-town-top-builders.ts))
- [x] HUNT token holders (mainnet, excluding contract addresses) ([📄 docs](https://docs.hunt.town/token-and-point/hunt-erc20), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-token-holders-mainnet.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-token-holders-mainnet.ts))
- [x] HUNT Building NFT holders ([📄 docs](https://docs.hunt.town/token-and-point/main-building), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-building-nft-holders.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-building-nft-holders.ts))
- [x] HUNT token holders (Base, excluding contract addresses) ([📄 docs](https://docs.hunt.town/token-and-point/hunt-erc20), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-token-holders-base.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-token-holders-base.ts))
- [x] HUNT Mini Building NFT holders ([📄 docs](https://docs.hunt.town/token-and-point/mini-building), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-mini-building-nft-holders.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-mini-building-nft-holders.ts))
- [x] Hunt Town Top Clappers (previous month) ([📄 docs](https://docs.hunt.town/token-and-point/hunt-tip-farcaster), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-town-top-clappers.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-town-top-clappers.ts))
- [x] Hunt Town Top Builders (by score, previous month) ([📄 docs](https://docs.hunt.town/token-and-point/hunt-tip-farcaster), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-town-top-builders-by-score.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-town-top-builders-by-score.ts))

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
      "note": "fid: 123, username: userA, rank: 1"
    },
    {
      "walletAddress": "0x0987654321098765432109876543210987654321",
      "weight": 10,
      "note": "fid: 456, username: userB, rank: 2"
    }
  ]
}
```

- `walletsCount`: The total number of whitelisted wallets.
- `updatedAt`: The timestamp when the whitelist was last updated.
- `wallets`: An array of whitelisted wallet objects.
  - `walletAddress`: The wallet address.
  - `weight`: The weight of the wallet. This is used to calculate the airdrop amount.
  - `note`: Additional information about the wallet. The content of the note varies depending on the airdrop.

> [!IMPORTANT]
> The list must be sorted by `weight` in descending order (higher to lower). This is crucial because the front-end might only display a limited number of top wallets from the beginning of the array.

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
