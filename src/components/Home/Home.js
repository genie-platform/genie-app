import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import { connect } from 'react-redux';

import PoolDisplayCard from '../PoolDisplayCard/PoolDisplayCard';
import MainButton from '../UI/MainButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.customValues.contentWidth,
    margin: 'auto',
    textAlign: '-webkit-center',
    paddingBottom: '8em',
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
  },
  titleBig: {
    width: theme.customValues.bigTitleWidth,
    color: 'black',
    fontWeight: '1000',
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
  integrateGuide: {
    display: 'flex',
    width: theme.customValues.bigTitleWidth,
  },
  iconCircle: {
    fill: theme.palette.primary.main,
    paddingRight: '0.6em',
  },
  integrationText: {
    textAlign: 'left',
  },
  integrationTitle: {
    fontWeight: '700',
    paddingBottom: '0.5em',
  },
  integrationSubTitle: {
    color: theme.customColors.lightText,
    paddingBottom: '0.4em',
  },
  divider: {
    margin: '2em 0',
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
          <Typography className={classes.heroTitle} variant="h3">
            The interest based
          </Typography>
          <Typography className={classes.heroTitle} variant="h3">
            reward platform
          </Typography>
          <Typography className={classes.heroSubTitle} variant="h6">
            Genie is an interest based reward platform. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia.
          </Typography>
        </div>
      </Grid>
      <Typography className={classes.kovanText} variant="h6">
        *Alpha version - Available only on Kovan network!
      </Typography>
      <Grid id="how-it-works" item xs={12}>
        <Typography className={classes.subTitle} variant="subtitle2">
          HOW IT WORKS?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">
          You do stuff, and then stuff happens, and then magically, money!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button className={classes.linkButton}>Learn More</Button>
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.divider} />
      </Grid>
      <Grid id="popular-pool" item xs={12}>
        <Typography className={classes.subTitle} variant="subtitle2">
          POPULAR POOLS
        </Typography>
      </Grid>
      <Grid item xs={12} justify="center">
        <Typography className={classes.titleBig} variant="h4">
          Duis aute irure dolor in reprehenderit in
        </Typography>
      </Grid>
      <Grid item xs={12} justify="center">
        {poolsGrid}
      </Grid>
      <Grid item xs={12} justify="center">
        <Button className={classes.linkButton}>Explore more pools</Button>
      </Grid>
      <Grid item xs={12}>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.subTitle} variant="subtitle2">
          INTEGRATE GENIE
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.titleBig} variant="h4">
          Labore et dolore magna aliqua eiusmod
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <div className={classes.integrateGuide}>
          <div>
            <CheckCircleRoundedIcon
              fontSize="large"
              className={classes.iconCircle}
            />
          </div>
          <div className={classes.integrationText}>
            <Typography variant="h6" className={classes.integrationTitle}>
              Reward your users
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.integrationSubTitle}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Typography>
          </div>
        </div>

        <div className={classes.integrateGuide}>
          <div>
            <CheckCircleRoundedIcon
              fontSize="large"
              className={classes.iconCircle}
            />
          </div>
          <div className={classes.integrationText}>
            <Typography variant="h6" className={classes.integrationTitle}>
              Lorem ipsum dolor
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.integrationSubTitle}
            >
              reprehenderit in voluptate velit esse cillum dolore
            </Typography>
          </div>
        </div>

        <div className={classes.integrateGuide}>
          <div>
            <CheckCircleRoundedIcon
              fontSize="large"
              className={classes.iconCircle}
            />
          </div>
          <div className={classes.integrationText}>
            <Typography variant="h6" className={classes.integrationTitle}>
              consectetur adipiscing
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.integrationSubTitle}
            >
              Excepteur sint occaecat cupidatat non proident
            </Typography>
          </div>
        </div>
      </Grid>

      <Grid item xs={12}>
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
