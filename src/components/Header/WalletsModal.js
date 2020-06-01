import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    width: 450,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#797979',
  },
  wallet: {
    cursor: 'pointer',
  },
  logo: {
    width: 80,
    height: 80,
  },
}));

const WalletsModal = (props) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const doesUsesHasMetaMask = typeof window.ethereum !== 'undefined';
  const metamask = doesUsesHasMetaMask && (
    <Grid
      item
      xs={12}
      onClick={async () => {
        setIsLoading(true);
        await props.onMetaMaskClick();
        setIsLoading(false);
      }}
      className={classes.wallet}
    >
      <img
        src="/logos/metamask.svg"
        alt="metamask fox"
        className={classes.logo}
      />
      <Typography variant="h5" className={classes.title}>
        MetaMask
      </Typography>
      <Typography variant="h6" className={classes.subTitle}>
        Connect to your MetaMask Wallet
      </Typography>
    </Grid>
  );

  const portis = (
    <Grid
      item
      xs={12}
      onClick={async () => {
        setIsLoading(true);
        await props.onPortisClick();
        setIsLoading(false);
      }}
      className={classes.wallet}
    >
      <img src="/logos/portis.svg" alt="portis logo" className={classes.logo} />
      <Typography variant="h5" className={classes.title}>
        Portis
      </Typography>
      <Typography variant="h6" className={classes.subTitle}>
        Connect with your Portis Account
      </Typography>
    </Grid>
  );

  const modalBody = (
    <div className={classes.body}>
      <Grid container spacing={8}>
        {isLoading ? (
          <>
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Connecting to wallet...</Typography>
            </Grid>
          </>
        ) : (
          <>
            {metamask}
            {portis}
          </>
        )}
      </Grid>
    </div>
  );

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="wallets-modal"
      aria-describedby="wallets-dai-modal"
      className={classes.root}
    >
      {modalBody}
    </Modal>
  );
};

export default WalletsModal;
