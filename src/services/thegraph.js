import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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

const GET_DEPOSITS = gql`
  query getDeposits($poolAddress: String!) {
    deposits(where: { pool: $poolAddress }) {
      id
      txHash
      createdAt
      pool
      sender
    }
  }
`;

export const usePoolState = async (poolAddress) =>
  useQuery(GET_POOL, {
    variables: { poolAddress },
  });

export const useRewardsState = async (poolAddress) =>
  useQuery(GET_REWARDS, {
    variables: { poolAddress },
  });

export const useDepositState = async (userAddress) => useQuery(GET_DEPOSITS);
