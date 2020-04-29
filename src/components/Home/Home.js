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

import FundDisplayCard from '../FundDisplayCard/FundDisplayCard';

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
  createFundButton: {
    borderRadius: 25,
    color: 'white',
    backgroundImage: theme.customGradients.primary,
  },
  exploreFunds: {
    borderRadius: 14,
  },
  fundsGrid: {
    paddingTop: '1em',
  },
  allFunds: {
    justifyContent: 'flex-end',
  },
}));

const Home = (props) => {
  const classes = useStyles();

  const onCreateFundClick = () => {
    // change to the createfund page
    props.history.push('/create-fund');
  };

  const welcomeMessage = 'Genie is an interest based reward platform';

  // load funds from backend
  const fundsGrid = (
    <Grid className={classes.fundsGrid} container spacing={1}>
      <Grid item xs={3}>
        <FundDisplayCard name="test fund1" image="images/cover1.jpg" />
      </Grid>
      <Grid item xs={3}>
        <FundDisplayCard name="test fund2" image="images/cover2.jpg" />
      </Grid>
      <Grid item xs={3}>
        <FundDisplayCard name="test fund3" image="images/cover3.jpg" />
      </Grid>
      <Grid item xs={3}>
        <FundDisplayCard name="test fund4" image="images/cover4.jpg" />
      </Grid>
    </Grid>
  );

  return (
    <Grid container className={classes.root} spacing={6}>
      <Grid item xs={12}>
        <div id="create-fund">
          <div className={classes.text}>{welcomeMessage}</div>
          <Button
            className={classes.createFundButton}
            variant="contained"
            onClick={onCreateFundClick}
          >
            Create a new fund
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Card elevation={3} id="explore-funds" className={classes.exploreFunds}>
          <CardContent>
            <Typography variant="h5">Explore funds</Typography>
            {fundsGrid}
            <CardActions className={classes.allFunds}>
              <Button>
                All funds
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
