import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '8em',
    background: '#363841',
    height: 100,
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  return <div className={classes.root}></div>;
};

export default Footer;
