import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';

import IntegrateGenie from './IntegrateGenie';
import PopularPools from './PopularPools';
import Hero from './Hero';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.customValues.contentWidth,
    margin: 'auto',
    textAlign: '-webkit-center',
  },
  heroGridItem: {
    padding: '0',
  },
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundImage: theme.customGradients.primary,
    height: '27em',
  },
  heroTitle: {
    width: theme.customValues.bigTitleWidth,
    color: 'white',
    fontWeight: '700',
  },
  heroSubTitle: {
    paddingTop: '1em',
    width: theme.customValues.bigTitleWidth,
    color: 'white',
  },
  subTitle: {
    color: '#797979',
    fontWeight: '600',
    letterSpacing: '0.2em',
    width: theme.customValues.bigTitleWidth,
  },
  subTitleText: {
    width: theme.customValues.bigTitleWidth,
  },
  titleBig: {
    width: theme.customValues.bigTitleWidth,
    color: 'black',
    fontWeight: '1000',
  },
  kovanText: {
    textAlign: 'center',
    color: 'red',
    width: '100%',
    marginBottom: '2em',
  },
  linkButton: {
    color: theme.palette.primary.main,
    fontWeight: '600',
  },
  link: {
    textDecoration: 'none',
  },
  divider: {
    margin: '2em 0',
    width: 80,
    height: 4,
  },
}));

const Home = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={6}>
      <Hero />

      <Typography className={classes.kovanText} variant="h6">
        *Alpha version - Available only on Kovan network!
      </Typography>

      <IntegrateGenie />

      <Grid item xs={12}>
        <Divider className={classes.divider} />
      </Grid>

      <PopularPools />

      <Grid item xs={12}>
        <Divider className={classes.divider} />
      </Grid>

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
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userID,
    name: state.auth.name,
    imageUrl: state.auth.imageUrl,
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignInSuccess: (userDetails) =>
      dispatch({
        type: 'AUTH_SUCCESS',
        token: userDetails.token,
        userId: userDetails.userId,
        name: userDetails.name,
        imageUrl: userDetails.imageUrl,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
