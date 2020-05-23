import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  flow: {
    justifyContent: 'center',
    marginBottom: '2em',
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
    width: theme.customValues.bigTitleWidth,
    marginBottom: '2em',
  },
  subTitleText: {
    width: 800,
  },
  linkButton: {
    color: theme.palette.primary.main,
    fontWeight: '600',
  },
}));

const HowItWorks = (props) => {
  const classes = useStyles();

  return (
    <>
      <Grid id="how-it-works" item xs={12}>
        <Typography className={classes.subTitle} variant="subtitle2">
          HOW IT WORKS?
        </Typography>
      </Grid>

      <Grid container spacing={3} className={classes.flow}>
        <Grid item xs={2}>
          <Avatar className={classes.numberIcon}>1</Avatar>
          <img src="/assets/1.svg" alt="join a pool" />
          <Typography variant="h6" className={classes.flowTitle}>
            Join a pool
          </Typography>
          <Typography variant="subtitle1" className={classes.flowSubTitle}>
            Stake money
          </Typography>
          <Typography variant="subtitle1" className={classes.flowSubTitle}>
            withdraw anytime
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Avatar className={classes.numberIcon}>2</Avatar>
          <img src="/assets/2.svg" alt="Win the challenge" />
          <Typography variant="h6" className={classes.flowTitle}>
            Win the challenge
          </Typography>
          <Typography variant="subtitle1" className={classes.flowSubTitle}>
            While the pool money gains interest
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Avatar className={classes.numberIcon}>3</Avatar>
          <img src="/assets/3.svg" alt="Get rewarded" />
          <Typography variant="h6" className={classes.flowTitle}>
            Get rewarded
          </Typography>
          <Typography variant="subtitle1" className={classes.flowSubTitle}>
            Everyone gets their money back
          </Typography>
          <Typography variant="subtitle1" className={classes.flowSubTitle}>
            The winner wins the gained interest
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" className={classes.subTitleText}>
          Genie leverages the Ethereum Network, it uses DAI, a dollar-pegged
          stablecoin, as a token of value, and it generates interest by lending
          the DAI using the Compound Protocol.
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
    </>
  );
};

export default HowItWorks;
