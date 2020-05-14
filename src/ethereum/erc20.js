import { Funding as FundingAbi, ERC20 as ERC20Abi } from 'genie-contracts-abi';
import { fromWei } from 'web3-utils';

import { config } from '../config/config';
import web3 from './web3';


const ONE_MILION = '1000000000000000000000000'

export const getAllowance = async (accountAddress, contractAddress) => {
  const tokenContract = new web3.eth.Contract(ERC20Abi, config.network.addresses.Dai);

  const allowance = await tokenContract.methods.allowance(accountAddress, contractAddress).call();
  return fromWei(allowance)
}

export const approve = async (accountAddress, poolAddress) => {
  const tokenContract = new web3.eth.Contract(ERC20Abi, config.network.addresses.Dai);

  return tokenContract.methods
    .approve(poolAddress, ONE_MILION)
    .send({ from: accountAddress });
}