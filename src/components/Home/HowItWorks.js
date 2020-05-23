import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  subTitle: {
    color: '#797979',
    fontWeight: '600',
    letterSpacing: '0.2em',
    width: theme.customValues.bigTitleWidth,
  },
  subTitleText: {
    width: theme.customValues.bigTitleWidth,
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
      {' '}
      <Grid id="how-it-works" item xs={12}>
        <Typography className={classes.subTitle} variant="subtitle2">
          HOW IT WORKS?
        </Typography>
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
