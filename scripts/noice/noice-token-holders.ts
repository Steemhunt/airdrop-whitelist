import { Network } from "alchemy-sdk";
import { createErc20HoldersWhitelist } from "../../libs/erc20-holders";

const config = {
  title: "NOICE Token Holders",
  documentLink: "https://noice.so",
};

const TOKEN_ADDRESS = "0x9Cb41FD9dC6891BAe8187029461bfAADF6CC0C69";
const NETWORK = Network.BASE_MAINNET;

createErc20HoldersWhitelist(__filename, TOKEN_ADDRESS, NETWORK, config);
