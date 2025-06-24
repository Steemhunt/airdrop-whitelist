import { Network } from "alchemy-sdk";
import { createErc20HoldersWhitelist } from "../../libs/erc20-holders";

const config = {
  title: "MT token holders (Base, excluding contract addresses)",
  doc_url: "https://docs.mint.club/mt",
};

const TOKEN_ADDRESS = "0x82e221543d231A832134261e3B32367610476418";
const NETWORK = Network.BASE_MAINNET;

createErc20HoldersWhitelist(__filename, TOKEN_ADDRESS, NETWORK, config);
