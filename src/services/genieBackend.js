import { config } from '../config/config';

export const sendDai = async (poolAddress, userAddress, userToken) => {
  const body = { poolAddress: poolAddress, userAddress: userAddress };

  const response = await window.fetch(`${config.backend.url}/faucets/dai`, {
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
