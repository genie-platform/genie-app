import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
  },
}));

const PoolExplorer = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Typography>Explore</Typography>
    </div>
  );
};

export default PoolExplorer;
