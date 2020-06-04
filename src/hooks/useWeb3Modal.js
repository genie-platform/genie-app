import { useState } from 'react';
import Portis from '@portis/web3';
import Web3Modal from 'web3modal';
import { config } from '../config/config';

const providerOptions = {
  portis: {
    package: Portis,
    options: {
      id: config.wallets.portisId,
    },
  },
};

const useWeb3Modal = (connectCallback) => {
  const [provider, setProvider] = useState();

  const web3Modal = new Web3Modal({
    network: 'kovan',
    cacheProvider: true,
    providerOptions,
  });

  web3Modal.on('connect', async (response) => {
    await setProvider(response);
    await connectCallback(response);
  });

  return { provider, core: web3Modal };
};

export default useWeb3Modal;
