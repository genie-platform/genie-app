import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { connect } from 'react-redux';

import { GAMES } from '../../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '2em',
  },
  label: {
    color: theme.customColors.text,
    paddingBottom: '0.2em',
  },
  text: {
    fontWeight: '500',
  },
  imageCards: {
    height: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: 6,
  },
  poolIcon: {
    height: 150,
    width: 150,
    border: '1px solid rgba(0,0,0,0.2)',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  poolImage: {},
}));

const PoolVerifyForm = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={10}>
          <Typography className={classes.label}>Name</Typography>
          <Typography variant="h5" className={classes.text}>
            {props.name}
          </Typography>
        </Grid>

        <Grid item xs={10}>
          <Typography className={classes.label}>Description</Typography>
          <Typography variant="h5" className={classes.text}>
            {props.description}
          </Typography>
        </Grid>

        {props.game !== GAMES.PATH_OF_EXILE && (
          <Grid item xs={10}>
            <Typography className={classes.label}>Challenge</Typography>
            <Typography variant="h5" className={classes.text}>
              {props.winnerDescription}
            </Typography>
          </Grid>
        )}

        <Grid item xs={10}>
          <Typography className={classes.label}>Ticket Price</Typography>
          <Typography variant="h5" className={classes.text}>
            {props.lockValue}
          </Typography>
        </Grid>

        {props.rewardDuration ? (
          <Grid item xs={10}>
            <Typography className={classes.label}>Reward Duration</Typography>
            <Typography variant="h5" className={classes.text}>
              {props.rewardDuration}
            </Typography>
          </Grid>
        ) : null}

        <Grid item xs={3}>
          <Typography className={classes.label}>Icon</Typography>
          <div className={clsx(classes.imageCards, classes.poolIcon)}>
            <Typography variant="h2" id="pool-icon">
              {props.icon}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={7}>
          <Typography className={classes.label}>Cover Image</Typography>
          <Card className={classes.imageCards}>
            <CardMedia
              className={classes.poolImage}
              image={props.coverImage}
              component="img"
            ></CardMedia>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.createdPool.name,
    description: state.createdPool.description,
    lockValue: state.createdPool.lockValue,
    icon: state.createdPool.icon,
    coverImage: state.createdPool.coverImage,
    winnerDescription: state.createdPool.winnerDescription,
    rewardDuration: state.createdPool.rewardDuration,
    game: state.createdPool.game,
  };
};

export default connect(mapStateToProps, null)(PoolVerifyForm);
