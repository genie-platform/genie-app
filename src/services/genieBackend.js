import { config } from '../config/config';

export const activateFaucet = async (poolAddress, userAddress, userToken) => {
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
