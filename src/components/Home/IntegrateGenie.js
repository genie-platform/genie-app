import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

import MainButton from '../UI/MainButton';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.customValues.contentWidth,
    width: '100%',
    margin: 'auto',
    overflow: 'hidden',
  },
  subTitle: {
    color: '#797979',
    fontWeight: '600',
    letterSpacing: '0.2em',
    width: theme.customValues.bigTitleWidth,
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
  },
}));

const IntegrateGenie = (props) => {
  const classes = useStyles();

  const onCreatePoolClick = () => {
    // change to the createpool page
    props.history.push('/create-pool');
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography className={classes.subTitle} variant="subtitle2">
          INTEGRATE GENIE
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
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
                  Issue
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.integrationSubTitle}
                >
                  Create a pool contract that will safely store the funds,
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.integrationSubTitle}
                >
                  connect your pool to a game or integrate one.
                </Typography>
              </div>
            </div>
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
                  Stake
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.integrationSubTitle}
                >
                  Deposit to the pool with the players to generate the reward.
                  The stake is retrieved when the game is over.
                </Typography>
              </div>
            </div>
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
                  Reward players
                </Typography>
                <Typography
                  variant="subtitle1"
                  className={classes.integrationSubTitle}
                >
                  The winners will be rewarded with the prize, generated by the
                  pool's locked value.
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <MainButton variant="contained" onClick={onCreatePoolClick}>
          Create a pool
        </MainButton>
      </Grid>
    </>
  );
};

export default withRouter(IntegrateGenie);
