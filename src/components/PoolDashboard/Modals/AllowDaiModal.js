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

const AllowDaiModal = (props) => {
  const classes = useStyles();

  const modalBody = (
    <div className={classes.body}>
      <img src="/logos/Badge_Dai.svg" alt="dai" className={classes.logo}></img>
      <Typography variant="h5">
        Genie requires your approval to transact with DAI
      </Typography>
      <MainButton onClick={props.onAllowDaiClick}>Allow DAI</MainButton>
    </div>
  );

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="allow-dai-modal"
      aria-describedby="allow-dai-modal"
      className={classes.root}
    >
      {modalBody}
    </Modal>
  );
};

export default AllowDaiModal;
