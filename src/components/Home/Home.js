import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';

import PoolDisplayCard from '../PoolDisplayCard/PoolDisplayCard';
import MainButton from '../UI/MainButton';

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
    height: 435,
  },
  text: {
    color: 'white',
    fontWeight: '700',
  },
  subTitle: {
    color: '#797979',
  },
  kovanText: {
    textAlign: 'center',
    color: 'red',
  },
  linkButton: {
    color: theme.palette.primary.main,
    fontWeight: '600',
  },
  poolsGrid: {
    paddingTop: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  allPools: {
    justifyContent: 'flex-end',
  },
  divider: {
    width: 80,
    height: 4,
  },
}));

const Home = (props) => {
  const classes = useStyles();

  const onCreatePoolClick = () => {
    // change to the createpool page
    props.history.push('/create-pool');
  };

  // load pools from backend
  const poolsGrid = (
    <div className={classes.poolsGrid}>
      <PoolDisplayCard
        clickable
        name="Path of Exile League"
        image="images/cover1.jpg"
        description="diablo 3 ladder"
        rewardDuration={14}
        lockValue={5}
        winner={'first player to reach level 100'}
        icon="⚔️"
      />
      <PoolDisplayCard
        clickable
        name="The Purge"
        image="images/cover2.jpg"
        icon="🌌"
      />
      <PoolDisplayCard
        clickable
        name="Last Survivor"
        image="images/cover3.jpg"
        icon="🌋"
      />
    </div>
  );

  return (
    <Grid container className={classes.root} spacing={6}>
      <Grid id="hero" item xs={12} style={{ padding: 0 }}>
        <div className={classes.hero}>
          <Typography className={classes.text} variant="h4">
            The interest based
          </Typography>
          <Typography className={classes.text} variant="h4">
            reward platform
          </Typography>
        </div>
      </Grid>
      <Typography className={classes.kovanText} variant="h6">
        *Alpha version - Available only on Kovan network!
      </Typography>
      <Grid id="how-it-work" item xs={12}>
        <Typography className={classes.subTitle} variant="h6">
          HOW IT WORKS?
        </Typography>
        <Button className={classes.linkButton}>Learn More</Button>
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.divider} />
      </Grid>
      <Grid id="popular-pool" item xs={12}>
        <Typography className={classes.subTitle} variant="h6">
          POPULAR POOLS
        </Typography>
        {poolsGrid}
      </Grid>
      <Grid item xs={12} justify="center">
        <Button className={classes.linkButton}>Explore more pools</Button>
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.subTitle} variant="h6">
          INTEGRATE GENIE
        </Typography>
        <MainButton variant="contained" onClick={onCreatePoolClick}>
          Create a pool
        </MainButton>
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
