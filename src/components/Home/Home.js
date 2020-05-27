import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';

import IntegrateGenie from './IntegrateGenie';
import PopularPools from './PopularPools';
import Hero from './Hero';
import HowItWorks from './HowItWorks';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: 'auto',
    textAlign: '-webkit-center',
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
    marginBottom: '1em',
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

      <HowItWorks />

      <Grid item xs={12}>
        <Divider className={classes.divider} />
      </Grid>

      <PopularPools />

      <Grid item xs={12}>
        <Divider className={classes.divider} />
      </Grid>

      <IntegrateGenie />
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
