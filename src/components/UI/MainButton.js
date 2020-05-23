import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const CustomButton = withStyles((theme) => ({
  root: {
    boxShadow: 'none',
    '&:hover': {
      border: 'none',
      boxShadow: 'none',
      // backgroundImage: theme.customGradients.primaryHover,
    },
    '&:active': {
      boxShadow: 'none',
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    border: '1px solid rgba(0,0,0,0.09)',
    backgroundImage: theme.customGradients.primary,
    borderRadius: 50,
    height: 50,
    width: 160,
    textTransform: 'none',
    fontWeight: 'bold',
    '&:hover': {
      backgroundImage: theme.customGradients.primaryHover,
    },
  },
  outlined: {
    backgroundImage: 'none',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundImage: theme.customGradients.whiteHover,
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  disabled: {
    background: '#ccc',
  },
  warning: {
    backgroundImage: theme.customGradients.error,
    '&:hover': {
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
        <CustomButton
          {...props}
          className={clsx(
            classes.root,
            props.disabled && classes.disabled,
            props.warning && classes.warning,
            props.variant === 'outlined' && classes.outlined
          )}
        >
          {props.children}
        </CustomButton>
      </span>
    </Tooltip>
  );
};

export default MainButton;
