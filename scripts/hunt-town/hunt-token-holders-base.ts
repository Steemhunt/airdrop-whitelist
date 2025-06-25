import { Network } from "alchemy-sdk";
import { createErc20HoldersWhitelist } from "../../libs/erc20-holders";

const config = {
  title: "HUNT Token Holders (Base)",
  doc_url: "https://docs.hunt.town/token-and-point/hunt-erc20",
};

const TOKEN_ADDRESS = "0x37f0c2915CeCC7e977183B8543Fc0864d03E064C";
const NETWORK = Network.BASE_MAINNET;

createErc20HoldersWhitelist(__filename, TOKEN_ADDRESS, NETWORK, config);
