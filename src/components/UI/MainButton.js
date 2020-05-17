import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    border: '1px solid rgba(0,0,0,0.09)',
    backgroundImage: theme.customGradients.primary,
    borderRadius: 50,
    height: 50,
    width: 160,
    textTransform: 'none',
    '&:hover': {
      border: '1px solid rgba(0,0,0,0)',
      backgroundImage: theme.customGradients.primaryHover,
    },
  },
  disabled: {
    background: '#ccc',
  },
  warning: {
    backgroundImage: theme.customGradients.error,
    '&:hover': {
      border: '1px solid rgba(0.1,0.1,0.1,0.3)',
      backgroundImage: theme.customGradients.errorHover,
    },
  },
}));

const MainButton = (props) => {
  const classes = useStyles();

  const tooltipTitle = props.tooltip ? props.tooltip : '';

  return (
    <Tooltip title={tooltipTitle}>
      <span>
        <Button
          {...props}
          className={clsx(
            classes.root,
            props.disabled && classes.disabled,
            props.warning && classes.warning
          )}
        >
          {props.children}
        </Button>
      </span>
    </Tooltip>
  );
};

export default MainButton;
