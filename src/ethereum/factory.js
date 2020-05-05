import web3 from "./web3";

const artifacts = require("genie-contracts-abi/FundingFactory");
const contract = require("@truffle/contract");

const FundFactory = contract({
  abi: artifacts,
  address: "0xfd99ba75A8515FD8E277b76F36719bA949Cb765F",
});
FundFactory.setProvider(web3.currentProvider);

export default FundFactory;
