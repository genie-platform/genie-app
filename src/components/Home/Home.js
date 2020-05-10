import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';

import PoolDisplayCard from '../PoolDisplayCard/PoolDisplayCard';

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
    backgroundImage: theme.customGradients.primary,
    padding: '9.2em 0',
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
  createPoolButton: {
    color: 'white',
    border: '1px solid rgba(0,0,0,0.09)',
    backgroundImage: theme.customGradients.primary,
    '&:hover': {
      border: '1px solid rgba(0,0,0,0)',
      backgroundImage: theme.customGradients.primaryHover,
    },
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
        name="Diablo3 ladder"
        image="images/cover1.jpg"
        description="diablo 3 ladder"
        rewardDuration={14}
        lockValue={5}
        winner={'first player to reach level 100'}
        icon="🧞"
      />
      <PoolDisplayCard
        clickable
        name="test pool2"
        image="images/cover2.jpg"
        icon="🌌"
      />
      <PoolDisplayCard
        clickable
        name="test pool3"
        image="images/cover3.jpg"
        icon="🌋"
      />
    </div>

    // <Grid className={classes.poolsGrid} container spacing={1}>
    //   <Grid item xs={4}>
    //     <PoolDisplayCard
    //       clickable
    //       name="Diablo3 ladder"
    //       image="images/cover1.jpg"
    //       description="diablo 3 ladder"
    //       rewardDuration={14}
    //       lockValue={5}
    //       winner={'first player to reach level 100'}
    //       icon="🧞"
    //     />
    //   </Grid>
    //   <Grid item xs={4}>
    //     <PoolDisplayCard
    //       clickable
    //       name="test pool2"
    //       image="images/cover2.jpg"
    //       icon="🌌"
    //     />
    //   </Grid>
    //   <Grid item xs={4}>
    //     <PoolDisplayCard
    //       clickable
    //       name="test pool3"
    //       image="images/cover3.jpg"
    //       icon="🌋"
    //     />
    //   </Grid>
    // </Grid>
  );

  return (
    <Grid container className={classes.root} spacing={6}>
      <Grid id="hero" item xs={12} style={{ padding: 0 }}>
        <div className={classes.hero}>
          <Typography className={classes.text} variant="h3">
            Genie
          </Typography>
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
