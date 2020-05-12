import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions/actionTypes';

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    color: theme.customColors.text,
    paddingBottom: '0.2em',
  },
}));

const PoolExtraForm = (props) => {
  const classes = useStyles();

  let defaultWinner = '';

  if (props.winnerDescription !== '') {
    defaultWinner = props.winnerDescription;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography className={classes.label}>Ticket Price</Typography>
          <TextField
            required
            id="lock-value"
            defaultValue={props.lockValue}
            helperText="The amount of DAI each user will lock"
            fullWidth
            type="number"
            onChange={(event) => {
              props.setPool({ lockValue: event.target.value });
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography className={classes.label}>
            Reward Period (days)
          </Typography>
          <TextField
            required
            defaultValue={props.rewardDuration}
            helperText="Leave the field empty if reward is not recurring"
            fullWidth
            type="number"
            onChange={(event) => {
              props.setPool({ rewardDuration: event.target.value });
            }}
          />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPool: (poolDetails) =>
      dispatch({
        type: actionTypes.SET_POOL,
        payload: {
          name: poolDetails.name,
          description: poolDetails.description,
          lockValue: poolDetails.lockValue,
          icon: poolDetails.icon,
          coverImage: poolDetails.coverImage,
          winnerDescription: poolDetails.winnerDescription,
          rewardDuration: poolDetails.rewardDuration,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PoolExtraForm);
