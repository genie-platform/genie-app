import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import EditIcon from '@material-ui/icons/Edit';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import CheckIcon from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import web3 from '../../../ethereum/web3';
import { FundingFactory as FundingFactoryAbi } from 'genie-contracts-abi';

import { config } from '../../../config/config';

const FIRST_STEP = 0;
const SECOND_STEP = 1;
const THIRD_STEP = 2;
const FINISH_STEP = 3;

const ColorlibConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage: theme.customGradients.secondary,
    },
  },
  completed: {
    '& $line': {
      backgroundImage: theme.customGradients.secondary,
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
}))(StepConnector);

const useColorlibStepIconStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage: theme.customGradients.secondary,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage: theme.customGradients.secondary,
  },
}));

const ColorlibStepIcon = (props) => {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <EditIcon />,
    2: <LocalFloristIcon />,
    3: <CheckIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  content: {
    height: '800px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '2em',
  },
  button: {
    marginRight: theme.spacing(1),
    borderRadius: 25,
  },
  buttonNext: {
    backgroundImage: theme.customGradients.primary,
    color: 'white',
  },
  finished: {
    paddingTop: '5em',
    textAlign: 'center',
  },
}));

const getStepContent = (step, props) => {
  switch (step) {
    case FIRST_STEP:
      return props.poolDetails;
    case SECOND_STEP:
      return props.poolExtra;
    case THIRD_STEP:
      return props.poolVerify;
    default:
      return 'Unknown step';
  }
};

const CustomStepper = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(FIRST_STEP);
  const [canContinue, setCanContinue] = useState(false);
  const stepNames = ['Pool details', 'Extra', 'Verify'];

  useEffect(() => {
    const MIN_POOL_NAME_LEN = 4;
    const MIN_POOL_DESCRIPTION_LEN = 0;
    const MIN_LOCK_VALUE = 0;

    let canContinue =
      props.name.length > MIN_POOL_NAME_LEN &&
      props.description.length > MIN_POOL_DESCRIPTION_LEN &&
      props.lockValue > MIN_LOCK_VALUE;

    setCanContinue(canContinue);
  }, [props.name, props.description, props.lockValue]);

  const createPool = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    debugger;
    const fundingFactoryContract = new web3.eth.Contract(
      FundingFactoryAbi,
      config.network.addresses.fundingFactory
    );

    const txReceipt = await fundingFactoryContract.methods
      .createFunding(config.network.addresses.cDai, accounts[0])
      .send({ from: accounts[0] });

    console.log(txReceipt);

    // TODO save pool data in DB (call backend endpoint)

    // TODO we also need to listen to creation event? when the tx is confirmed
    // and get the the new contract address
    // and then update the pool in the db with contract address
  };

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    // create pool if on last step
    if (activeStep === THIRD_STEP) {
      await createPool();
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      props.history.push('/'); // go back to homepage
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    // setActiveStep(0);
    props.history.push('/');
  };

  const FormContent = getStepContent(activeStep, props);

  const stepperBody = (
    <div>
      <FormContent className={classes.content} />
      <div className={classes.buttons}>
        <Button
          onClick={handleBack}
          className={classes.button}
          variant="outlined"
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!canContinue}
          className={clsx(classes.button, canContinue && classes.buttonNext)}
        >
          {activeStep === stepNames.length - 1 ? 'Create Pool' : 'Next'}
        </Button>
      </div>
    </div>
  );

  const finished = (
    <div className={classes.finished}>
      <Typography className={classes.instructions}>
        Congatulations, pool created! Pool dashboard coming soon ™
      </Typography>
      <Button
        onClick={handleReset}
        className={clsx(classes.button, classes.buttonNext)}
      >
        Go back to the home page
      </Button>
    </div>
  );

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {stepNames.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>{activeStep === stepNames.length ? finished : stepperBody}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.createdPool.name,
    description: state.createdPool.description,
    lockValue: state.createdPool.lockValue,
    icon: state.createdPool.icon,
    coverImage: state.createdPool.coverImage,
  };
};

export default connect(mapStateToProps, null)(withRouter(CustomStepper));
