import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { lowercaseAddress } from '../utils/utils';

/**
 * This service fetches the current state of part of our dapp that are on the blockchain, using thegraph
 *
 * thegraph indexes the blockchain and allows us to fetch data more easily using graphql
 *
 * To view the genie schema on thegraph visit https://thegraph.com/explorer/subgraph/genie-platform/genie-graph-v2
 *
 * for example, here we fetch the pool, rewards & deposits data.
 */

const GET_POOL = gql`
  query Pool($poolAddress: String!) {
    pool(id: $poolAddress) {
      address
      totalStaked
      numberOfPlayers
    }
  }
`;

const GET_REWARDS = gql`
  query getRewards($poolAddress: String!) {
    rewards(where: { pool: $poolAddress }) {
      id
      txHash
      createdAt
      pool
      amount
      receiver
    }
  }
`;

/**
 * query to fetch a specific user's deposits
 */
const GET_DEPOSITS = gql`
  query getDeposits($userAddress: String!) {
    deposits(where: { sender: $userAddress }) {
      id
      txHash
      createdAt
      pool
      sender
      amount
    }
  }
`;

const GET_ACCOUNT_POOLS = gql`
  query getAccountPools($userAddress: String!) {
    accountPools(where: { account: $userAddress }) {
      id
      poolAddress
      balance
      account {
        address
      }
    }
  }
`;

/**
 * return the pool state
 * @param {string} poolAddress the pool's smart contract address
 */
export const usePoolState = (poolAddress) =>
  useQuery(GET_POOL, {
    variables: { poolAddress },
  });

/**
 * return the reward state
 * @param {string} poolAddress the pool's smart contract address
 */
export const useRewardsState = (poolAddress) =>
  useQuery(GET_REWARDS, {
    variables: { poolAddress },
  });

/**
 * returns all deposits of a certain user address
 * @param {string} userAddress the user address
 */
export const useDepositState = (userAddress) =>
  useQuery(GET_DEPOSITS, {
    variables: { userAddress },
  });

/**
 * returns the pools the user is in
 * @param {string} userAddress the user address
 */
export const useAccountPoolsState = (userAddress) => {
  if (userAddress) {
    userAddress = lowercaseAddress(userAddress);
  }
  return useQuery(GET_ACCOUNT_POOLS, {
    variables: { userAddress },
  });
};
