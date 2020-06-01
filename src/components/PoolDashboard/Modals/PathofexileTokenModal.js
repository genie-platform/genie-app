import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';
import MainButton from '../../UI/MainButton';

import { generateGenieToken } from '../../../utils/utils';

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
    width: 500,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    padding: '2em 3em',
    outline: 0,
    margin: '2em',
  },
  confirm: {
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
    padding: '1em',
    outline: 0,
  },
  text: {
    padding: '0.5em 0',
  },
  button: {
    paddingTop: '1em',
  },
}));

const PathofexileTokenModal = (props) => {
  const classes = useStyles();

  const modalBody = (
    <div className={classes.body}>
      <Typography variant="h6" className={classes.text}>
        Add this token to the end of your new character name, so we could know
        which character of yours is in the pool!
      </Typography>
      <Typography variant="h4" className={classes.text}>
        {props.address
          ? generateGenieToken(props.address, props.poolAddress)
          : 'CONNECT WALLET!'}
      </Typography>
      <MainButton
        onClick={() => {
          props.onClose();
          props.openJoinPoolModals();
        }}
        className={classes.button}
      >
        I understand. Let's go!
      </MainButton>
    </div>
  );

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="poeToken-modal"
      aria-describedby="poeToken-modal"
      className={classes.root}
    >
      {modalBody}
    </Modal>
  );
};

export default PathofexileTokenModal;
