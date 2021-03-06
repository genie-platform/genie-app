import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.customValues.contentWidth,
    width: '100%',
    margin: 'auto',
  },
  flow: {
    justifyContent: 'center',
    marginBottom: '1em',
    width: '99%',
  },
  flowTitle: {
    padding: '0.5em',
    fontWeight: 900,
  },
  flowSubTitle: {
    color: '#797979',
  },
  numberIcon: {
    marginBottom: '2em',
  },
  subTitle: {
    color: '#797979',
    fontWeight: '600',
    letterSpacing: '0.2em',
    marginBottom: '2em',
    marginTop: '2em',
  },
  subTitleText: {},
  linkButton: {
    color: theme.palette.primary.main,
    fontWeight: '600',
    marginTop: '2em'
  },
}));

const HowItWorks = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid id="how-it-works" item xs={12}>
        <Typography className={classes.subTitle} variant="subtitle2">
          HOW IT WORKS?
        </Typography>
      </Grid>

      <Grid container item spacing={3} className={classes.flow}>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <Avatar className={classes.numberIcon}>1</Avatar>
          <img src="/assets/1.svg" alt="join a pool" />
          <Typography variant="h6" className={classes.flowTitle}>
            Join a challenge
          </Typography>
          <Typography variant="subtitle1" className={classes.flowSubTitle}>
            Stake money to the pool
          </Typography>
          <Typography variant="subtitle1" className={classes.flowSubTitle}>
            Withdraw anytime
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <Avatar className={classes.numberIcon}>2</Avatar>
          <img src="/assets/2.svg" alt="Play the game" />
          <Typography variant="h6" className={classes.flowTitle}>
            Play the game
          </Typography>
          <Typography variant="subtitle1" className={classes.flowSubTitle}>
            While the pool money gains interest
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <Avatar className={classes.numberIcon}>3</Avatar>
          <img src="/assets/3.svg" alt="Win!" />
          <Typography variant="h6" className={classes.flowTitle}>
            Win!
          </Typography>
          <Typography variant="subtitle1" className={classes.flowSubTitle}>
            Everyone gets their money back
          </Typography>
          <Typography variant="subtitle1" className={classes.flowSubTitle}>
            The winner recieves the reward
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" className={classes.subTitleText}>
          Genie leverages the Ethereum Network, it uses DAI, a dollar-pegged
          stablecoin, as a token of value, and it generates interest by lending
          the DAI using the Compound Protocol.
          <br />
          Chainlink oracles are responsible to determine the winner in a trustless way.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          className={classes.linkButton}
          href="https://www.notion.so/Genie-9a51f51cd3044b7c87f1fe6232171f15"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </Button>
      </Grid>
    </div>
  );
};

export default HowItWorks;
