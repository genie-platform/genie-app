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
  },
  text: {
    textAlign: 'center',
    backgroundImage: theme.customGradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  createPoolButton: {
    borderRadius: 25,
    color: 'white',
    backgroundImage: theme.customGradients.primary,
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

  const welcomeMessage = 'Genie is an interest based reward platform';

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
        <div id="create-pool">
          <div className={classes.text}>{welcomeMessage}</div>
          <Button
            className={classes.createPoolButton}
            variant="contained"
            onClick={onCreatePoolClick}
          >
            Create a new pool
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Card elevation={3} id="explore-pools" className={classes.explorePools}>
          <CardContent>
            <Typography variant="h5">Explore pools</Typography>
            {poolsGrid}
            <CardActions className={classes.allPools}>
              <Button>
                All pools
                <KeyboardArrowRightIcon />
              </Button>
            </CardActions>
          </CardContent>
        </Card>
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
