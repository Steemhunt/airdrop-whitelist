# 🎁 Airdrop Whitelist

This repository maintains airdrop whitelists for the [Mint Club Airdrop Tool](https://mint.club/airdrop/create), along with scripts to update them.

## ✅ Whitelists Maintained

- [x] **List summary** ([✅ summary file](whitelist/summary.json))

<!-- WHITELIST_TABLE_START -->
### Mint Club

- [x] MT Token Holders (Base) ([📄 docs](https://docs.mint.club/mt), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/mint-club/mt-token-holders-base.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/mint-club/mt-token-holders-base.ts))

### Hunt Town

- [x] Building NFT Holders (Mainnet) ([📄 docs](https://docs.hunt.town/token-and-point/main-building), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-building-nft-holders.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-building-nft-holders.ts))
- [x] Mini Building NFT Holders (Base) ([📄 docs](https://docs.hunt.town/token-and-point/mini-building), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-mini-building-nft-holders.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-mini-building-nft-holders.ts))
- [x] HUNT Token Holders (Base) ([📄 docs](https://docs.hunt.town/token-and-point/hunt-erc20), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-token-holders-base.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-token-holders-base.ts))
- [x] HUNT Token Holders (Mainnet) ([📄 docs](https://docs.hunt.town/token-and-point/hunt-erc20), [✅ whitelist](https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/hunt-town/hunt-token-holders-mainnet.json), [⚙️ script](https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/hunt-town/hunt-token-holders-mainnet.ts))

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
      "rank": 1
    },
    {
      "walletAddress": "0x0987654321098765432109876543210987654321",
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
  - `... (optional)`: You can include other informational fields like `rank` to provide additional context.

## 📜 Whitelist Summary

The `whitelist/summary.json` file provides a summary of all available whitelists. It contains a nested object where the keys are categories, and the values are objects containing the whitelists in that category. This file is automatically updated when you run the update scripts.

Here is an example of the `summary.json` format:

```json
{
  "mint-club": {
    "mt-token-holders-base": {
      "title": "MT Token Holders (Base)",
      "documentLink": "https://docs.mint.club/mt",
      "isWeighted": true,
      "walletsCount": 1000,
      "updatedAt": "2026-02-13T04:39:24.812Z",
      "script": "https://github.com/Steemhunt/airdrop-whitelist/blob/main/scripts/mint-club/mt-token-holders-base.ts",
      "endpoint": "https://raw.githubusercontent.com/Steemhunt/airdrop-whitelist/main/whitelist/mint-club/mt-token-holders-base.json"
    }
  }
}
```
