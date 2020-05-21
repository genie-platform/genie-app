import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MainButton from '../../UI/MainButton';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    width: 700,
    height: 500,
    backgroundColor: 'white',
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    padding: '4em 7em',
    outline: 0,
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

const PathofexileModal = (props) => {
  const classes = useStyles();
  const [accountName, setAccountName] = useState('');
  const [didFinish, setDidFinish] = useState(false);

  const modalBody = !didFinish ? (
    <div className={classes.body}>
      <Typography variant="h4" className={classes.text}>
        Hey there!
      </Typography>
      <Typography variant="h5" className={classes.text}>
        Before we can start, a small thing:
      </Typography>
      <Typography variant="body1" className={classes.text}>
        We need your Path of Exile account name - So we could connect your path
        of exile info and give you the reward when you win!
      </Typography>
      <Typography variant="body2" className={classes.text}>
        Make sure your account is set to public, otherwise we can't get your
        character data!
      </Typography>
      <TextField
        className={classes.text}
        label="Your Account Name"
        variant="outlined"
        value={accountName}
        onChange={(event) => {
          setAccountName(event.target.value);
        }}
      />
      <Typography variant="h6" className={classes.text}>
        Important! Please add this token to your new character, so we could know
        which character of yours is in the pool!
      </Typography>
      <Typography variant="h4" className={classes.text}>
        {props.address
          ? generateGenieToken(props.address, props.poolAddress)
          : 'CONNECT WALLET!'}
      </Typography>
      <MainButton
        onClick={() => {
          setTimeout(() => {
            props.onEnterAccount(accountName);
            props.onClose();
          }, 2500);
          setDidFinish(true);
        }}
        className={classes.button}
      >
        Let's Go!
      </MainButton>
    </div>
  ) : (
    <div className={classes.confirm}>
      <CircularProgress />
      <Typography variant="h5">
        Great! We got your account name! Moving on
      </Typography>
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

export default PathofexileModal;
