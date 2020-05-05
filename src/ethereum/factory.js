import web3 from "./web3";

const artifacts = require("genie-contracts-abi/FundingFactory");
const contract = require("@truffle/contract");

const FundFactory = contract({
  abi: artifacts,
  address: "0x34C5ec946D8837aea0647da7f83f61F737a88024",
});
FundFactory.setProvider(web3.currentProvider);

const instance = FundFactory.deployed();

export default instance;
