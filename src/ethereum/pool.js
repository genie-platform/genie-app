import { Funding as FundingAbi } from 'genie-contracts-abi';
import { fromWei, toWei } from 'web3-utils';

import { config } from '../config/config';
import { getWeb3 } from '../services/web3';

const web3 = getWeb3();

export const fetchAllPools = async () => {
  const response = await window.fetch(`${config.backend.url}/pools`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return json.data;
};

export const fetchPoolMetadata = async (contractAddress) => {
  const response = await window.fetch(
    `${config.backend.url}/pools/contract/${contractAddress}`,
    {
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  const json = await response.json();
  return json.data;
};

export const getTotalStaked = async (contractAddress) => {
  const poolContract = new web3.eth.Contract(FundingAbi, contractAddress);

  const staked = await poolContract.methods.balance().call();
  return fromWei(staked);
};

export const getCurrentPrize = async (contractAddress) => {
  const poolContract = new web3.eth.Contract(FundingAbi, contractAddress);

  const currentPrize = await poolContract.methods.interestEarned().call();
  return fromWei(currentPrize);
};

export const balanceOf = async (contractAddress) => {
  const accounts = await web3.eth.getAccounts();
  const accountAddress = accounts[0];

  const poolContract = new web3.eth.Contract(FundingAbi, contractAddress);

  const balance = await poolContract.methods.balanceOf(accountAddress).call();
  return fromWei(balance);
};

export const deposit = (accountAddress, contractAddress, amount, userId) => {
  debugger;
  const poolContract = new web3.eth.Contract(FundingAbi, contractAddress);
  debugger;
  return poolContract.methods
    .deposit(toWei(amount.toString()), userId)
    .send({ from: accountAddress });
};

export const withdraw = (accountAddress, contractAddress) => {
  const poolContract = new web3.eth.Contract(FundingAbi, contractAddress);

  return poolContract.methods.withdraw().send({ from: accountAddress });
};
