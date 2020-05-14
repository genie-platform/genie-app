import Web3 from 'web3';

let web3 = new Web3();

export const getWeb3 = () => (web3 ? web3 : new Web3());
export const setWeb3Provider = (provider) => web3.setProvider(provider);
