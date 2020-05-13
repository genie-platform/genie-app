import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: '0.5em',
  },
}));

const PoolDisplayCardWide = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Typography id="icon">{props.icon}</Typography>
      <div>
        <Typography id="pool-name">{props.name}</Typography>
        <Typography id="pool-desc">{props.description}</Typography>
      </div>
    </div>
  );
};

export default PoolDisplayCardWide;
