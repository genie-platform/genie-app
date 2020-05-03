import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Stepper from './CustomStepper/CustomStepper';
import PoolDetailsForm from './PoolDetailsForm/PoolDetailsForm';
import PoolExtraForm from './PoolExtraForm/PoolExtraForm';
import PoolVerifyForm from './PoolVerifyForm/PoolVerifyForm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '40%',
    minWidth: 400,
    minHeight: 500,
    margin: 'auto',
    borderRadius: 25,
    background: 'white',
  },
}));

const PoolCreator = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper
        poolDetails={PoolDetailsForm}
        poolExtra={PoolExtraForm}
        poolVerify={PoolVerifyForm}
      />
    </div>
  );
};

export default PoolCreator;
