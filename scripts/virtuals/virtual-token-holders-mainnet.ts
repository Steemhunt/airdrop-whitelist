import { Network } from "alchemy-sdk";
import { createErc20HoldersWhitelist } from "../../libs/erc20-holders";

const config = {
  title: "VIRTUAL Token Holders (Mainnet)",
  documentLink: "https://app.virtuals.io/dashboard",
};

const TOKEN_ADDRESS = "0x44ff8620b8cA30902395A7bD3F2407e1A091BF73";
const NETWORK = Network.ETH_MAINNET;

createErc20HoldersWhitelist(__filename, TOKEN_ADDRESS, NETWORK, config);
