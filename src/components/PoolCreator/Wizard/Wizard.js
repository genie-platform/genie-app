import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { FundingFactory as FundingFactoryAbi } from 'genie-contracts-abi';

import * as actionTypes from '../../../store/actions/actionTypes';
import { config } from '../../../config/config';
import MainButton from '../../UI/MainButton';
import ConfirmTxModal from '../../UI/ConfirmTxModal';
import { lowercaseAddress } from '../../../utils/utils';
import { getWeb3 } from '../../../services/web3';

const CHOOSE_GAME = 0;
const SETTINGS = 1;
const POOL_DETAILS = 2;
const VERIFY = 3;
const FINISH = 4;

const getStepContent = (step, props) => {
  switch (step) {
    case CHOOSE_GAME:
      return props.chooseGame;
    case POOL_DETAILS:
      return props.poolDetails;
    case SETTINGS:
      return props.poolExtra;
    case VERIFY:
      return props.poolVerify;
    default:
      return 'Unknown step';
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  content: {
    height: '800px',
  },
  title: {
    padding: '1.5em 0',
    fontWeight: 'bold',
    textAlign: 'center',
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

export const Wizard = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(CHOOSE_GAME);
  const [canContinue, setCanContinue] = useState(false);
  const [isPoolCreated, setIsPoolCreated] = useState(false);
  const [contractAddress, setContractAddress] = useState();
  const [confirmTxModalOpen, setConfirmTxModalOpen] = useState(false);
  const stepNames = [
    'Select a Game',
    'Pool Settings',
    'Pool Details',
    'Preview',
  ];

  const verifyForm = useCallback(() => {
    const MIN_POOL_NAME_LEN = 4;
    const MIN_POOL_DESCRIPTION_LEN = 0;
    const MIN_LOCK_VALUE = 0;
    const MAX_LEVEL = 100;
    const MIN_LEVEL = 0;

    const currentStepVerify =
      activeStep !== POOL_DETAILS && activeStep !== SETTINGS;

    const settingsVerify =
      activeStep === SETTINGS &&
      props.winningCondition.value <= MAX_LEVEL &&
      props.winningCondition.value > MIN_LEVEL;

    const detailsVerify =
      activeStep === POOL_DETAILS &&
      props.name.length > MIN_POOL_NAME_LEN &&
      props.description.length > MIN_POOL_DESCRIPTION_LEN &&
      props.lockValue > MIN_LOCK_VALUE;

    return currentStepVerify || settingsVerify || detailsVerify;
  }, [
    props.name,
    props.description,
    props.lockValue,
    props.winningCondition,
    activeStep,
  ]);

  useEffect(() => {
    setCanContinue(verifyForm());
  }, [props.name, props.description, props.lockValue, activeStep, verifyForm]);

  // TODO FUNC TOO LARGE - REFACTOR!!!
  const createPool = async () => {
    const web3 = getWeb3();
    const poolOwnerAddress = props.address;

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
      game: props.game,
      winningCondition: props.winningCondition,
      txHash: null,
      contractAddress: null,
      poolOwnerAddress: null,
    };

    // send request to create pool in db
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

    setConfirmTxModalOpen(true);

    // create pool contract on the blockchain
    // Get blockchain data after tx confirms, then update pool object
    const txReceipt = await fundingFactoryContract.methods
      .createFunding(config.network.addresses.cDai, poolOwnerAddress)
      .send({ from: poolOwnerAddress });

    setConfirmTxModalOpen(false);

    if (txReceipt) {
      const contractAddress = lowercaseAddress(
        txReceipt.events.FundingCreated.returnValues.funding
      );

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
    if (activeStep === VERIFY) {
      await createPool();
    }
  };

  const handleBack = () => {
    if (activeStep === CHOOSE_GAME) {
      props.history.push('/'); // go back to homepage
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const openDashboard = () => {
    props.onPoolCreation(); // reset pool state
    props.history.push(`/dashboard/${contractAddress}`);
  };

  const FormContent = getStepContent(activeStep, props);

  const body = (
    <div>
      <FormContent className={classes.content} />
      <div className={classes.buttons}>
        <MainButton
          variant="contained"
          onClick={handleNext}
          disabled={!canContinue}
          className={clsx(classes.button, canContinue && classes.buttonNext)}
        >
          {activeStep === VERIFY ? 'Create Pool' : 'Continue'}
        </MainButton>
        {activeStep === CHOOSE_GAME ? null : (
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
            color="primary"
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
    <div>
      <Typography variant="h4" className={classes.title}>
        {stepNames[activeStep]}
      </Typography>
      <div className={classes.root}>
        {activeStep === FINISH ? finished : body}
      </div>
      <ConfirmTxModal
        open={confirmTxModalOpen}
        onClose={() => setConfirmTxModalOpen(false)}
      />
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
    game: state.createdPool.game,
    winningCondition: state.createdPool.winningCondition,
    token: state.auth.token,
    address: state.auth.address,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPoolCreation: () => dispatch({ type: actionTypes.RESET_POOL }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Wizard));
