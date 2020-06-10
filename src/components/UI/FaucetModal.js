import React, { useState, useEffect } from 'react';
import { useAsync, useAsyncRetry } from 'react-use';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';
import MainButton from './MainButton';
import ErrorIcon from '@material-ui/icons/Error';

import { getUserBalance as getUserDaiBalance } from '../../ethereum/erc20';
import {
  activateBothFaucets,
  activateDaiFaucet,
  activateEthFaucet,
} from '../../services/genieBackend';
import { fetchPoolMetadata } from '../../ethereum/pool';
import { getWeb3 } from '../../services/web3';
import { config } from '../../config/config';
import ConfirmTxModal from '../UI/ConfirmTxModal';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1.5em',
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    textAlign: 'center',
    width: 550,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
}));

const FaucetModal = (props) => {
  const classes = useStyles();
  const [confirmTxModalOpen, setConfirmTxModalOpen] = useState(false);
  const [faucetModalOpen, setFaucetModalOpen] = useState(false);

  useEffect(() => {
    setFaucetModalOpen(props.isOpen);
  }, [props.isOpen]);

  // get address dai balance
  const userDaiBalance = useAsyncRetry(async () => {
    return getUserDaiBalance(props.address);
  }, [props.address]);

  // get address eth balance
  const userEthBalance = useAsyncRetry(async () => {
    const web3 = getWeb3();
    const balance = await web3.eth.getBalance(props.address);
    return web3.utils.fromWei(balance);
  }, [props.address]);

  // get pool metadata
  const poolMetadataState = useAsync(async () => {
    return fetchPoolMetadata(props.poolAddress);
  }, [props.poolAddress]);

  const handleOnFaucet = async (activateFaucetFunc) => {
    setFaucetModalOpen(false);
    setConfirmTxModalOpen(true);
    await activateFaucetFunc();

    // temporary adding extra waiting time so the user balance reload will get the updated values
    setTimeout(() => {
      props.reloadUserBalance();
      setConfirmTxModalOpen(false);
    }, 8000);
  };

  const isLoading =
    poolMetadataState.loading ||
    userDaiBalance.loading ||
    userEthBalance.loading ||
    props.address === null;

  const isEnoughEth =
    isLoading || config.faucets.eth.amount <= userEthBalance.value;
  const isEnoughDai =
    isLoading || poolMetadataState.value.lockValue <= userDaiBalance.value;

  const sendDai = !isLoading ? (
    <>
      <Typography variant="h5">
        You have ${userDaiBalance.value} but minimum staking amount is $
        {poolMetadataState.value.lockValue}.
      </Typography>
      <Typography variant="h5">Please get more DAI to join pool:</Typography>
      <MainButton
        variant="outlined"
        onClick={() => {
          handleOnFaucet(
            async () =>
              await activateDaiFaucet(
                props.poolAddress,
                props.address,
                props.token
              )
          );
        }}
      >
        SEND ME DAI
      </MainButton>
    </>
  ) : null;

  const sendEth = !isLoading ? (
    <>
      <Typography variant="h5">
        You have Ξ{userEthBalance.value} which is not enough for tx gas
      </Typography>
      <Typography variant="h5">Please get more ETH to join pool:</Typography>
      <MainButton
        variant="outlined"
        onClick={() => {
          handleOnFaucet(
            async () => await activateEthFaucet(props.address, props.token)
          );
        }}
      >
        SEND ME ETH
      </MainButton>
    </>
  ) : null;

  const sendBoth = !isLoading ? (
    <>
      <Typography variant="h5">
        You have ${userDaiBalance.value} but minimum staking amount is $
        {poolMetadataState.value.lockValue}.
      </Typography>
      <Typography variant="h5">
        Please get more ETH & DAI to join pool:
      </Typography>
      <MainButton
        variant="outlined"
        onClick={() => {
          handleOnFaucet(
            async () =>
              await activateBothFaucets(
                props.poolAddress,
                props.address,
                props.token
              )
          );
        }}
      >
        SEND ME ETH & DAI
      </MainButton>
    </>
  ) : null;

  const modalBody = (
    <div className={classes.body}>
      <ErrorIcon color="error" fontSize="large" />
      <Typography variant="h5">Not enough funds!</Typography>
      {!isEnoughDai && isEnoughEth && sendDai}
      {isEnoughDai && !isEnoughEth && sendEth}
      {!isEnoughDai && !isEnoughEth && sendBoth}
    </div>
  );

  return (
    <>
      <ConfirmTxModal
        open={confirmTxModalOpen}
        customText="Funds are on their way!"
        onClose={() => {
          setConfirmTxModalOpen(false);
        }}
      />
      <Modal
        open={!isLoading && !(isEnoughDai && isEnoughEth) && faucetModalOpen}
        onClose={() => {
          setFaucetModalOpen(false);
        }}
        aria-labelledby="faucets-modal"
        aria-describedby="faucets-modal"
        className={classes.root}
      >
        {modalBody}
      </Modal>
    </>
  );
};

export default FaucetModal;
