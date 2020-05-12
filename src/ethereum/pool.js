import { Funding as FundingAbi } from 'genie-contracts-abi';
import { fromWei } from 'web3-utils'
import { config } from '../config/config';

import web3 from './web3';


export const fetchPoolMetadata = async (contractAddress) => {
  const response = await window
    .fetch(`${config.backend.url}/pools/contract/${contractAddress}`, {
      mode: 'cors',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
  const json = await response.json()
  return json.data
}

export const getTotalStaked = async (contractAddress) => {
  const poolContract = new web3.eth.Contract(
    FundingAbi,
    contractAddress 
  );

  const staked = await poolContract.methods.balance().call()
  return fromWei(staked)
}


export const getCurrentPrize = async (contractAddress) => {
  const poolContract = new web3.eth.Contract(
    FundingAbi,
    contractAddress 
  );

  const staked = await poolContract.methods.interestEarned().call()
  return fromWei(staked)
}