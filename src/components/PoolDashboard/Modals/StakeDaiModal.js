import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';
import MainButton from '../../UI/MainButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

const StakeDaiModal = (props) => {
  const classes = useStyles();

  const modalBody = (
    <div className={classes.body}>
      <Typography variant="h5">
        Stake ${props.lockValue} and join pool?
      </Typography>
      <Typography variant="subtitle1">
        You can withdraw the entire amount back at any time
      </Typography>
      <MainButton onClick={props.onStake}>Join pool</MainButton>
    </div>
  );

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="stake-dai-modal"
      aria-describedby="stake-dai-modal"
      className={classes.root}
    >
      {modalBody}
    </Modal>
  );
};

export default StakeDaiModal;
