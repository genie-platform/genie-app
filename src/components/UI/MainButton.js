import React from 'react';
import Button from '@material-ui/core/Button';
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
}));

const MainButton = (props) => {
  const classes = useStyles();

  return (
    <Button
      {...props}
      className={clsx(classes.root, props.disabled && classes.disabled)}
    >
      {props.children}
    </Button>
  );
};

export default MainButton;
