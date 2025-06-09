# 🎁 Airdrop Whitelist

This repository maintains airdrop whitelists for the [Mint Club Airdrop Tool](https://mint.club/airdrops), along with scripts to update them.

## ✅ Whitelists Maintained

This repository currently maintains the following whitelists:

- [ ] Farcastser Pro Subscribers
- [x] Farcaster Creator Reward Winners (previous week) ([📄 docs](https://docs.farcaster.xyz/reference/warpcast/api#get-creator-reward-winners), [⚙️ updating script](scripts/farcaster-creator-reward-winners.ts), [✅ whitelist](whitelist/farcaster-creator-reward-winners.json))
- [x] Farcaster Developer Reward Winners (previous week) ([📄 docs](https://docs.farcaster.xyz/reference/warpcast/api#get-developer-reward-winners), [⚙️ updating script](scripts/farcaster-developer-reward-winners.ts), [✅ whitelist](whitelist/farcaster-developer-reward-winners.json))
- [ ] Hunt Town Top Builders (previous month)
- [ ] Hunt Town Top Tippers (previous month)
- [ ] HUNT Building NFT holders
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

## 🙏 Contributing

If you would like to add your own airdrop whitelist to this repository, please feel free to open a Pull Request. We welcome contributions!
