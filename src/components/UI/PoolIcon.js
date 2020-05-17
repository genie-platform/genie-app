import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { getRandomGradient } from '../../utils/utils';

const BORDER_SIZE = 148;
const ICON_SIZE = BORDER_SIZE - 8;

const useStyles = makeStyles((theme) => ({
  root: {
    height: BORDER_SIZE,
    width: BORDER_SIZE,
    background: 'white',
    borderRadius: 100,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '-4.5em',
  },
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    borderRadius: 100,
    userSelect: 'none',
  },
}));

const PoolIcon = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant="h1"
        id="pool-icon"
        className={classes.icon}
        style={{ backgroundImage: getRandomGradient() }}
      >
        {props.children}
      </Typography>
    </div>
  );
};

export default PoolIcon;
