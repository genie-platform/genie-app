import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: (props) => (props.wide ? 400 : 250),
    position: 'relative',
    padding: '0.5em',
  },
  container: {
    display: 'flex',
    alignItmes: 'center',
    justifyContent: 'center',
    width: '18em',
    height: '13em',
    borderRadius: 8,
    border: '1px solid rgba(160,160,160,0.2)',
  },
  clickable: {
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.2)',
    },
  },
  icon: {
    margin: 'auto',
    fontSize: '7em',
  },
  bottom: {
    paddingTop: '0.5em',
    fontWeight: '700',
    color: '#3F3F3F',
    cursor: 'default',
  },
}));

const PoolDisplayCard = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <div
        className={clsx(
          classes.container,
          props.clickable && classes.clickable
        )}
      >
        <div className={classes.icon}>{props.icon}</div>
      </div>
      <Typography className={classes.bottom} variant="h6">
        {props.name}
      </Typography>
    </div>
  );
};

export default PoolDisplayCard;
