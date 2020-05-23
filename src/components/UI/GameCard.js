import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 376,
    width: 295,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    borderRadius: 6,
    border: '1px solid rgba(160,160,160,0.6)',
    cursor: 'pointer',
    '&:hover': {
      border: '1px solid #00A7FF',
    },
  },
  disabled: {
    opacity: '50%',
    cursor: 'default',
    '&:hover': {
      border: '1px solid rgba(160,160,160,0.6)',
    },
  },
  checked: {
    border: '1px solid #00A7FF',
  },
  image: {
    height: 162,
    width: 162,
    borderRadius: 6,
  },
  iconCircleChecked: {
    fill: theme.palette.primary.main,
  },
  iconCircleUnchecked: {
    fill: '#ccc',
  },
}));

const GameCard = (props) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(
        classes.root,
        props.checked && classes.checked,
        props.disabled && classes.disabled
      )}
      elevation={0}
      onClick={() => props.onClick()}
    >
      <CardHeader title={props.title}></CardHeader>
      <CardMedia image={props.image} className={classes.image}></CardMedia>
      <CardContent>
        <Typography variant="body1">{props.subtitle}</Typography>
        <Typography variant="body2">{props.description}</Typography>
      </CardContent>
      <CardContent>
        <CheckCircleRoundedIcon
          fontSize="large"
          className={clsx(
            props.checked
              ? classes.iconCircleChecked
              : classes.iconCircleUnchecked
          )}
        />
      </CardContent>
    </Card>
  );
};

export default GameCard;
