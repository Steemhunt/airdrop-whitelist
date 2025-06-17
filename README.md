# 🎁 Airdrop Whitelist

This repository maintains airdrop whitelists for the [Mint Club Airdrop Tool](https://mint.club/airdrops), along with scripts to update them.

## ⏱️ TODO

- [x] List summary (list filename, list count) ([✅ summary file](whitelist/summary.json))

## ✅ Whitelists Maintained

This repository currently maintains the following whitelists:

- [ ] Farcastser Pro Subscribers
- [x] Farcaster Creator Reward Winners (previous week) ([📄 docs](https://docs.farcaster.xyz/reference/warpcast/api#get-creator-reward-winners), [⚙️ updating script](scripts/farcaster-creator-reward-winners.ts), [✅ whitelist](whitelist/farcaster-creator-reward-winners.json))
- [x] Farcaster Developer Reward Winners (previous week) ([📄 docs](https://docs.farcaster.xyz/reference/warpcast/api#get-developer-reward-winners), [⚙️ updating script](scripts/farcaster-developer-reward-winners.ts), [✅ whitelist](whitelist/farcaster-developer-reward-winners.json))
- [x] Hunt Town Top Builders (previous month) ([📄 docs](https://docs.hunt.town/token-and-point/hunt-tip-farcaster), [⚙️ updating script](scripts/hunt-town-top-builders.ts), [✅ whitelist](whitelist/hunt-town-top-builders.json))
- [x] Hunt Town Top Tippers (previous month) ([📄 docs](https://docs.hunt.town/token-and-point/hunt-tip-farcaster), [⚙️ updating script](scripts/hunt-town-top-tippers.ts), [✅ whitelist](whitelist/hunt-town-top-tippers.json))
- [x] HUNT Building NFT holders ([📄 docs](https://docs.hunt.town/token-and-point/main-building), [⚙️ updating script](scripts/hunt-building-nft-holders.ts), [✅ whitelist](whitelist/hunt-building-nft-holders.json))
- [x] HUNT Mini Building NFT holders ([📄 docs](https://docs.hunt.town/token-and-point/mini-building), [⚙️ updating script](scripts/hunt-mini-building-nft-holders.ts), [✅ whitelist](whitelist/hunt-mini-building-nft-holders.json))
- [ ] HUNT token holders (mainnet)
- [ ] HUNT token holders (Base)
- [ ] MT token holders (Base)

## 🔄 Updating Whitelists

You can update all whitelists at once or update a specific list.

### Update All Lists

To update all whitelists, run the following command, which will execute all the scripts in the `scripts` folder:

```bash
npm run update:all
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

The `whitelist/summary.json` file provides a summary of all available whitelists. It contains an array of objects, where each object represents a whitelist and includes its name, filename, and the number of wallets it contains. This file is automatically updated when you run the update scripts.

Here is an example of the `summary.json` format:

```json
{
  "farcaster-creator-reward-winners": {
    "walletsCount": 2989,
    "updatedAt": "2025-06-17T06:43:50.506Z"
  },
  "farcaster-developer-reward-winners": {
    "walletsCount": 50,
    "updatedAt": "2025-06-17T07:12:20.367Z"
  },
  "hunt-building-nft-holders": {
    "walletsCount": 282,
    "updatedAt": "2025-06-17T06:43:12.362Z"
  }
}
```

## 🙏 Contributing

If you would like to add your own airdrop whitelist to this repository, please feel free to open a Pull Request. We welcome contributions!
