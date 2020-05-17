import Web3 from 'web3';
import { config } from '../config/config';

// default provider so we could use web3 even if user isn't connected
const provider = new Web3.providers.HttpProvider(config.network.kovanProvider);

let web3 = new Web3(provider);

export const getWeb3 = (provider) => {
  if (provider) {
    web3 = new Web3(provider);
  }
  return web3;
};
export const setWeb3Provider = (provider) => web3.setProvider(provider);
