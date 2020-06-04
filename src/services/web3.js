import Web3 from 'web3';
import { config } from '../config/config';

// default provider so we could use web3 even if user isn't connected
const defaultProvider = new Web3.providers.HttpProvider(
  config.network.kovanProvider
);

let web3 = new Web3(defaultProvider);

export const getWeb3 = (provider) => {
  if (provider) {
    web3.setProvider(provider);
  }
  return web3;
};
export const setWeb3Provider = (provider = defaultProvider) =>
  web3.setProvider(provider);
