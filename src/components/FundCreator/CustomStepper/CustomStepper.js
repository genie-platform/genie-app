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
  },
  button: {
    marginRight: theme.spacing(1),
    borderRadius: 25,
  },
  buttonNext: {
    backgroundImage: theme.customGradients.primary,
    color: 'white',
  },
}));

const getSteps = () => {
  return ['Fund details', 'Extra', 'Verify'];
};

const getStepContent = (step, props) => {
  switch (step) {
    case 0:
      return props.fundDetails;
    case 1:
      return props.fundExtra;
    case 2:
      return props.fundVerify;
    default:
      return 'Unknown step';
  }
};

const CustomStepper = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [canContinue, setCanContinue] = useState(false);
  const steps = getSteps();

  useEffect(() => {
    const MIN_FUND_NAME_LEN = 4;
    const MIN_FUND_DESCRIPTION_LEN = 0;
    const MIN_LOCK_VALUE = 0;

    let canContinue =
      props.name.length > MIN_FUND_NAME_LEN &&
      props.description.length > MIN_FUND_DESCRIPTION_LEN &&
      props.lockValue > MIN_LOCK_VALUE;

    setCanContinue(canContinue);
  }, [props.name, props.description, props.lockValue]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      props.history.push('/'); // go back to homepage
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
          {activeStep === steps.length - 1 ? 'Create Fund' : 'Next'}
        </Button>
      </div>
    </div>
  );

  const finished = (
    <div>
      <Typography className={classes.instructions}>
        All steps completed - you&apos;re finished
      </Typography>
      <Button onClick={handleReset} className={classes.button}>
        Reset
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
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>{activeStep === steps.length ? finished : stepperBody}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.createdFund.name,
    description: state.createdFund.description,
    lockValue: state.createdFund.lockValue,
    icon: state.createdFund.icon,
    coverImage: state.createdFund.coverImage,
  };
};

export default connect(mapStateToProps, null)(withRouter(CustomStepper));
