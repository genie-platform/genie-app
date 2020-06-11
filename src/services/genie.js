import { config } from '../config/config';

export const activateBothFaucets = async (
  poolAddress,
  userAddress,
  userToken
) => {
  const body = { userAddress: userAddress, poolAddress: poolAddress };

  const response = await window.fetch(`${config.backend.url}/faucets/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};

export const activateDaiFaucet = async (
  poolAddress,
  userAddress,
  userToken
) => {
  const body = { userAddress: userAddress, poolAddress: poolAddress };

  const response = await window.fetch(`${config.backend.url}/faucets/dai`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(body),
  });
  debugger
  return await response.json();
};

export const activateEthFaucet = async (userAddress, userToken) => {
  const body = { userAddress: userAddress };

  const response = await window.fetch(`${config.backend.url}/faucets/eth`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};
