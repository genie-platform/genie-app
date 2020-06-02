import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Typography, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MainButton from '../../UI/MainButton';
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
    width: 700,
    backgroundColor: 'white',
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    padding: '1.5em 2.5em',
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
    padding: '0.3em 0',
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
      <Typography variant="h5" className={classes.text}>
        Please enter your Path of Exile account name
      </Typography>
      <Typography variant="body1" className={classes.text}>
        So we could connect your path of exile info and give you the reward when
        you win!
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
      <Typography variant="h5" className={classes.text}>
        Important:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <img src="/assets/account1.png" alt="account1" />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <Grid item>
            <Typography variant="h6" className={classes.text}>
              Make sure your characters page is set to public, otherwise we
              can't get your character data!
            </Typography>
          </Grid>
          <Grid item>
            <img src="/assets/account2.png" alt="account2" />
          </Grid>
        </Grid>
      </Grid>

      <MainButton
        onClick={() => {
          setTimeout(() => {
            props.onEnterAccount(accountName);
            props.onClose();
            props.onClick();
            setDidFinish(false);
          }, 800);
          setDidFinish(true);
        }}
        className={classes.button}
      >
        Continue
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
      aria-labelledby="poe-modal"
      aria-describedby="poe-modal"
      className={classes.root}
    >
      {modalBody}
    </Modal>
  );
};

export default PathofexileModal;
