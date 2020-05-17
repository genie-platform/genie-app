import { Funding as FundingAbi, ERC20 as ERC20Abi } from 'genie-contracts-abi';
import { fromWei } from 'web3-utils';

import { config } from '../config/config';
import { getWeb3 } from '../services/web3';

const ONE_MILLION = '1000000000000000000000000';

const web3 = getWeb3();

export const getAllowance = async (accountAddress, contractAddress) => {
  const tokenContract = new web3.eth.Contract(
    ERC20Abi,
    config.network.addresses.Dai
  );

  const allowance = await tokenContract.methods
    .allowance(accountAddress, contractAddress)
    .call();
  return fromWei(allowance);
};

export const getUserBalance = async (accountAddress) => {
  const tokenContract = new web3.eth.Contract(
    ERC20Abi,
    config.network.addresses.Dai
  );

  const userBalance = await tokenContract.methods
    .balanceOf(accountAddress)
    .call();
  return fromWei(userBalance);
};

export const approve = async (accountAddress, poolAddress) => {
  const tokenContract = new web3.eth.Contract(
    ERC20Abi,
    config.network.addresses.Dai
  );

  return tokenContract.methods
    .approve(poolAddress, ONE_MILLION)
    .send({ from: accountAddress });
};
