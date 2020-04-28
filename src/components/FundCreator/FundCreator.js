import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Stepper from './CustomStepper/CustomStepper';
import FundDetailsForm from './FundDetailsForm/FundDetailsForm';
import FundExtraForm from './FundExtraForm/FundExtraForm';

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

const FundCreator = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper fundDetails={FundDetailsForm} fundExtra={FundExtraForm} />
    </div>
  );
};

export default FundCreator;
