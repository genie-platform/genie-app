import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { connect } from 'react-redux';

import PoolDisplayCard from '../PoolDisplayCard/PoolDisplayCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    margin: 'auto',
    padding: 50,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    backgroundImage: theme.customGradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  kovanText: {
    textAlign: 'center',
    color: 'red',
  },
  linkButton: {
    color: theme.palette.primary.main,
    fontWeight: '600',
  },
  createPoolButton: {
    color: 'white',
    background: theme.palette.primary.main,
  },
  explorePools: {
    borderRadius: 14,
  },
  poolsGrid: {
    paddingTop: '1em',
  },
  allPools: {
    justifyContent: 'flex-end',
  },
}));

const Home = (props) => {
  const classes = useStyles();

  const onCreatePoolClick = () => {
    // change to the createpool page
    props.history.push('/create-pool');
  };

  const welcomeMessage = 'The interest based \nreward platform';
  const kovanMessage = '*Alpha version - Available only on Kovan network!';

  // load pools from backend
  const poolsGrid = (
    <Grid className={classes.poolsGrid} container spacing={1}>
      <Grid item xs={3}>
        <PoolDisplayCard
          clickable
          name="Diablo3 ladder"
          image="images/cover1.jpg"
          description="diablo 3 ladder"
          rewardDuration={14}
          lockValue={5}
          winner={'first player to reach level 100'}
          icon="🧞"
        />
      </Grid>
      <Grid item xs={3}>
        <PoolDisplayCard
          clickable
          name="test pool2"
          image="images/cover2.jpg"
        />
      </Grid>
      <Grid item xs={3}>
        <PoolDisplayCard
          clickable
          name="test pool3"
          image="images/cover3.jpg"
        />
      </Grid>
      <Grid item xs={3}>
        <PoolDisplayCard
          clickable
          name="test pool4"
          image="images/cover4.jpg"
        />
      </Grid>
    </Grid>
  );

  return (
    <Grid container className={classes.root} spacing={6}>
      <Grid item xs={12}>
        <div>
          <Typography className={classes.text} variant="h3">
            Genie
          </Typography>
          <Typography className={classes.text} variant="h4">
            {welcomeMessage}
          </Typography>
          <Typography className={classes.kovanText} variant="h6">
            {kovanMessage}
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Popular pools</Typography>
        {poolsGrid}
      </Grid>
      <Grid item xs={12} justify="center">
        <Button className={classes.linkButton}>Explore more pools</Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          className={classes.createPoolButton}
          variant="contained"
          onClick={onCreatePoolClick}
        >
          Create a new pool
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
