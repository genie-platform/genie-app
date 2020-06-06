import { config } from '../config/config';

export const sendDai = (poolAddress, userAddress, userToken) => {
  const body = { poolAddress: poolAddress, userAddress: userAddress };

  window.fetch(`${config.backend.url}/faucets/dai`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(body),
  });
};
