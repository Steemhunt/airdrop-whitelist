import { Network } from "alchemy-sdk";
import { createErc20HoldersWhitelist } from "../../libs/erc20-holders";

const config = {
  title: "MT Token Holders (Base)",
  documentLink: "https://docs.mint.club/mt",
};

const TOKEN_ADDRESS = "0xFf45161474C39cB00699070Dd49582e417b57a7E";
const NETWORK = Network.BASE_MAINNET;

createErc20HoldersWhitelist(__filename, TOKEN_ADDRESS, NETWORK, config);
