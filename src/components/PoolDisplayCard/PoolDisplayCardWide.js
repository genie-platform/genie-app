import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: '0.5em',
    display: 'flex',
  },
  icon: {
    padding: '0 0.2em',
  },
  name: {
    paddingBottom: '0.4em',
    color: theme.customColors.text,
    fontWeight: 'bold',
  },
  desc: {
    color: theme.customColors.lightText,
  },
}));

const PoolDisplayCardWide = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Typography variant="h1" id="icon" className={classes.icon}>
        {props.icon}
      </Typography>
      <div>
        <Typography variant="h6" id="pool-name" className={classes.name}>
          {props.name}
        </Typography>
        <Typography variant="h6" id="pool-desc" className={classes.desc}>
          {props.description}
        </Typography>
      </div>
    </div>
  );
};

export default PoolDisplayCardWide;
