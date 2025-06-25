import { Network } from "alchemy-sdk";
import { createErc20HoldersWhitelist } from "../../libs/erc20-holders";

// This script gets all holders of the HUNT token on Mainnet
// and creates a whitelist file with the owner's address and their balance.
// The weight is set to the token balance.

const config = {
  title: "HUNT Token Holders (Mainnet)",
  documentLink: "https://docs.hunt.town/token-and-point/hunt-erc20",
};

const TOKEN_ADDRESS = "0x9AAb071B4129B083B01cB5A0Cb513Ce7ecA26fa5";
const NETWORK = Network.ETH_MAINNET;

createErc20HoldersWhitelist(__filename, TOKEN_ADDRESS, NETWORK, config);
