import { Network } from "alchemy-sdk";
import { createErc20HoldersWhitelist } from "../../libs/erc20-holders";

// This script gets all holders of the HUNT token on Mainnet
// and creates a whitelist file with the owner's address and their balance.
// The weight is set to the token balance.

const config = {
  title: "HUNT token holders (mainnet, excluding contract addresses)",
  doc_url: "https://docs.hunt.town/token-and-point/hunt-erc20",
};

const TOKEN_ADDRESS = "0x9aab071b4129b083b01cb5a0cb52e42a5350d25b";
const NETWORK = Network.ETH_MAINNET;

createErc20HoldersWhitelist(__filename, TOKEN_ADDRESS, NETWORK, config);
