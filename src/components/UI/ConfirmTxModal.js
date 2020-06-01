import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';
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
    width: 400,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
  logo: {
    width: 90,
    height: 90,
  },
}));

const ConfirmTxModal = (props) => {
  const classes = useStyles();

  const modalBody = (
    <div className={classes.body}>
      <CircularProgress />
      <Typography variant="h5">
        Waiting for transaction confirmation on the network
      </Typography>
    </div>
  );

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="tx-confirm-modal"
      aria-describedby="tx-confirm-modal"
      className={classes.root}
    >
      {modalBody}
    </Modal>
  );
};

export default ConfirmTxModal;
