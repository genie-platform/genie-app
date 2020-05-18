import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions/actionTypes';

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    color: theme.customColors.text,
    paddingBottom: '0.2em',
  },
}));

const PoolSettingsForm = (props) => {
  const classes = useStyles();

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
    lockValue: state.createdPool.lockValue,
    rewardDuration: state.createdPool.rewardDuration,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPool: (poolDetails) =>
      dispatch({
        type: actionTypes.SET_POOL,
        payload: {
          lockValue: poolDetails.lockValue,
          rewardDuration: poolDetails.rewardDuration,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PoolSettingsForm);
