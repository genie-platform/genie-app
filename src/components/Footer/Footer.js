import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '8em',
    background: '#363841',
    height: 70,
  },
  logosDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '0.7em',
    width: '60%',
    margin: 'auto',
  },
  text: {
    padding: '0.5em',
    color: '#969AA6',
  },
  logo: {
    width: 30,
    height: 30,
    padding: '0.5em',
  },
}));

const Footer = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div id="logos" className={classes.logosDiv}>
        <Typography variant="subtitle2" className={classes.text}>
          © 2020 Genie
        </Typography>
        <div>
          <a
            href="https://discord.gg/dmGv6GJ"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src="/logos/discord.svg"
              alt="discord logo"
              className={classes.logo}
            ></img>
          </a>
          <a
            href="https://github.com/genie-platform"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src="/logos/github.svg"
              alt="github logo"
              className={classes.logo}
            ></img>
          </a>
          <a
            href="https://twitter.com/genieplatform"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src="/logos/twitterCircle.svg"
              alt="twitter logo"
              className={classes.logo}
            ></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
