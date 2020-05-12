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
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import web3 from '../../../ethereum/web3';
import { FundingFactory as FundingFactoryAbi } from 'genie-contracts-abi';

import { config } from '../../../config/config';
import MainButton from '../../UI/MainButton';
import { lowercaseAddress } from '../../../utils/utils';

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
      backgroundImage: theme.customGradients.primary,
    },
  },
  completed: {
    '& $line': {
      backgroundImage: theme.customGradients.primary,
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
    backgroundImage: theme.customGradients.primary,
  },
  completed: {
    backgroundImage: theme.customGradients.primary,
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
  stepper: {
    backgroundColor: 'transparent',
  },
  content: {
    height: '800px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '2em',
  },
  backButtonArea: {
    display: 'flex',
    padding: '0.8em 0',
    color: theme.customColors.lightText,
  },
  backButton: {
    textDecoration: 'none',
    cursor: 'pointer',
    paddingLeft: '0.3em',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  buttonNext: {},
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
  const [isPoolCreated, setIsPoolCreated] = useState(false);
  const [contractAddress, setContractAddress] = useState();
  const stepNames = ['Pool Profile', 'Extra', 'Verify'];

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
    const poolOwnerAddress = accounts[0];

    const fundingFactoryContract = new web3.eth.Contract(
      FundingFactoryAbi,
      config.network.addresses.fundingFactory
    );

    // create pool object in backend with non-blockchain data
    const poolMetadata = {
      name: props.name,
      description: props.description,
      lockValue: props.lockValue,
      icon: props.icon,
      coverImage: props.coverImage,
      winnerDescription: props.winnerDescription,
      rewardDuration: props.rewardDuration,
      txHash: null,
      contractAddress: null,
      poolOwnerAddress: null,
    };

    const pool = await window.fetch(`${config.backend.url}/pools`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify(poolMetadata),
    });

    // get pool id so we could update it with the blockchain data
    const dbPoolData = await pool.json();
    const poolId = dbPoolData.data.pool._id;

    // Get blockchain data after tx confirms, then update pool object
    const txReceipt = await fundingFactoryContract.methods
      .createFunding(config.network.addresses.cDai, poolOwnerAddress)
      .send({ from: poolOwnerAddress });

    if (txReceipt) {
      const contractAddress = lowercaseAddress(
        txReceipt.events.FundingCreated.returnValues.funding
      )

      setIsPoolCreated(true);
      setContractAddress(contractAddress);

      const poolBlockchainData = {
        txHash: txReceipt.transactionHash,
        contractAddress,
        poolOwnerAddress: lowercaseAddress(poolOwnerAddress),
      };

      // call backend endpoint to update pool data in DB
      window.fetch(`${config.backend.url}/pools/${poolId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify(poolBlockchainData),
      });
    } else {
      console.log("error - couldn't create pool");
    }
  };

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    // create pool if on last step
    if (activeStep === THIRD_STEP) {
      await createPool();
    }
  };

  const handleBack = () => {
    if (activeStep === FIRST_STEP) {
      props.history.push('/'); // go back to homepage
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const openDashboard = () => {
    // setActiveStep(0);
    props.history.push(`/dashboard/${contractAddress}`);
  };

  const FormContent = getStepContent(activeStep, props);

  const stepperBody = (
    <div>
      <FormContent className={classes.content} />
      <div className={classes.buttons}>
        <MainButton
          variant="contained"
          onClick={handleNext}
          disabled={!canContinue}
          className={clsx(classes.button, canContinue && classes.buttonNext)}
        >
          {activeStep === stepNames.length - 1 ? 'Create Pool' : 'Continue'}
        </MainButton>
        {activeStep === FIRST_STEP ? null : (
          <div className={classes.backButtonArea}>
            <Typography>Or </Typography>
            <Link
              onClick={handleBack}
              className={clsx(classes.button, classes.backButton)}
            >
              Back
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  const finished = (
    <div className={classes.finished}>
      {isPoolCreated ? (
        <React.Fragment>
          <Typography className={classes.instructions}>
            Congatulations, your pool is created!
          </Typography>
          <Button
              onClick={openDashboard}
            className={clsx(classes.button, classes.buttonNext)}
          >
            Open Dashboard
          </Button>
        </React.Fragment>
      ) : (
        <Typography className={classes.instructions}>
          Please confirm the transaction with your Ethereum provider!
        </Typography>
      )}
    </div>
  );

  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepper}
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
    winnerDescription: state.createdPool.winnerDescription,
    rewardDuration: state.createdPool.rewardDuration,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, null)(withRouter(CustomStepper));
