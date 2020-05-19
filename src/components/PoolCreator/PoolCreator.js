import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Wizard from './Wizard/Wizard';
import PoolDetailsForm from './PoolDetailsForm/PoolDetailsForm';
import PoolSettingsForm from './PoolSettingForm/PoolSettingsForm';
import PoolVerifyForm from './PoolVerifyForm/PoolVerifyForm';
import ChooseGame from './ChooseGame/ChooseGame';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 920,
    // minWidth: 400,
    // minHeight: 500,
    margin: 'auto',
  },
  loginMessage: {
    textAlign: 'center',
    paddingTop: '4em',
  },
}));

const PoolCreator = (props) => {
  const classes = useStyles();

  const wizard = (
    <Wizard
      chooseGame={ChooseGame}
      poolDetails={PoolDetailsForm}
      poolExtra={PoolSettingsForm}
      poolVerify={PoolVerifyForm}
    />
  );

  const connectionMessage = (
    <div className={classes.loginMessage}>
      {!props.isAuthenticated && (
        <>
          <Typography variant="h5">
            Please sign in with a google account to create a pool!
          </Typography>
          <Typography variant="h5">
            We know it's annoying and we will work to remove google login
            entirely soon™
          </Typography>
        </>
      )}
      {props.address === null && (
        <>
          <Typography variant="h5">Please connect to a wallet!</Typography>
        </>
      )}
    </div>
  );

  return (
    <div className={classes.root}>
      {props.isAuthenticated && props.address !== null
        ? wizard
        : connectionMessage}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    address: state.auth.address,
  };
};

export default connect(mapStateToProps, null)(PoolCreator);
