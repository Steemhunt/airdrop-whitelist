# 🎁 Airdrop Whitelist

This repository maintains airdrop whitelists for the [Mint Club Airdrop Tool](https://mint.club/airdrops), along with scripts to update them.

## ✅ Whitelists Maintained

This repository currently maintains the following whitelists:

- [ ] Farcastser Pro Subscribers
- [x] Farcaster Creator Reward Winners (previous week) ([📄 docs](https://docs.farcaster.xyz/reference/warpcast/api#get-creator-reward-winners), [⚙️ updating script](scripts/farcaster-creator-reward-winners.ts), [✅ whitelist](whitelist/farcaster-creator-reward-winners.json))
- [x] Farcaster Developer Reward Winners (previous week) ([📄 docs](https://docs.farcaster.xyz/reference/warpcast/api#get-developer-reward-winners), [⚙️ updating script](scripts/farcaster-developer-reward-winners.ts), [✅ whitelist](whitelist/farcaster-developer-reward-winners.json))
- [x] Hunt Town Top Builders (previous month)
- [x] Hunt Town Top Tippers (previous month)
- [x] HUNT Building NFT holders ([📄 docs](https://docs.hunt.town/token-and-point/main-building), [⚙️ updating script](scripts/hunt-building-nft-holders.ts), [✅ whitelist](whitelist/hunt-building-nft-holders.json))
- [ ] HUNT Mini Building NFT holders
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

Each whitelist JSON file is an array of objects. Each object must contain `walletAddress`, and can optionally include `weight` and other informational fields.

- `walletAddress` (string): **Required.** The user's wallet address.
- `weight` (number): _Optional._ The weight for the airdrop. Defaults to `1` if not provided.
- ... any other fields: _Optional._ Any other fields are for informational purposes and will be ignored.

> [!IMPORTANT]
> The list must be sorted by `weight` in descending order (higher to lower). This is crucial because the front-end might only display a limited number of top wallets from the beginning of the array.

### Example

```json
[
  {
    "walletAddress": "0x1234567890123456789012345678901234567890",
    "weight": 50,
    "note": "User A"
  },
  {
    "walletAddress": "0x0987654321098765432109876543210987654321"
    "weight": 10,
    "note": "User B"
  }
]
```

## 🙏 Contributing

If you would like to add your own airdrop whitelist to this repository, please feel free to open a Pull Request. We welcome contributions!
