import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import CustomStepper from './CustomStepper/CustomStepper';
import PoolDetailsForm from './PoolDetailsForm/PoolDetailsForm';
import PoolExtraForm from './PoolExtraForm/PoolExtraForm';
import PoolVerifyForm from './PoolVerifyForm/PoolVerifyForm';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '40%',
    minWidth: 400,
    minHeight: 500,
    margin: 'auto',
  },
  loginMessage: {
    textAlign: 'center',
    paddingTop: '4em',
  },
}));

const PoolCreator = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.isAuthenticated ? (
        <CustomStepper
          poolDetails={PoolDetailsForm}
          poolExtra={PoolExtraForm}
          poolVerify={PoolVerifyForm}
        />
      ) : (
        <div className={classes.loginMessage}>
          <Typography variant="h5">
            Please sign in with a google account to create a pool!
          </Typography>
          <Typography variant="h5">
            We know it's annoying and we will work to remove google login
            entirely soon™
          </Typography>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps, null)(PoolCreator);
