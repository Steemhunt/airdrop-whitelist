import { Network } from "alchemy-sdk";
import { createErc20HoldersWhitelist } from "../../libs/erc20-holders";

const TOKEN_ADDRESS = "0x37f0c2915CeCC7e977183B8543Fc0864d03E064C";
const TOKEN_SYMBOL = "HUNT";
const NETWORK = Network.BASE_MAINNET;

createErc20HoldersWhitelist(__filename, TOKEN_ADDRESS, TOKEN_SYMBOL, NETWORK);
