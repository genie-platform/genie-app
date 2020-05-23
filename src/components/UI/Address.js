import React from 'react';
import Blockies from 'react-blockies';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { shortenAddress } from '../../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  blockie: {
    marginLeft: '0.5em',
    borderRadius: '60px',
  },
}));

const Address = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography>{shortenAddress(props.address)}</Typography>
      <Blockies
        seed={props.address}
        size={8}
        scale={3}
        className={classes.blockie}
      />
    </div>
  );
};

export default Address;
