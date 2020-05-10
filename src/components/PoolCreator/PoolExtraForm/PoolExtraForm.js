import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions/actionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2em',
  },
  title: {
    paddingBottom: '1em',
  },
  sliderArea: {
    display: 'flex',
    flexDirection: 'column',
  },
  slider: {
    width: '90%',
    margin: 'auto',
  },
}));

const sliderValueText = (value) => {
  return `${value} days`;
};

const sliderMarks = [
  {
    value: 1,
    label: '1 day',
  },
  {
    value: 7,
    label: '1 week',
  },
  {
    value: 31,
    label: '1 month',
  },
  {
    value: 62,
    label: '2 months',
  },
];

const PoolExtraForm = (props) => {
  const classes = useStyles();
  const [isPrizeRecurring, setIsPrizeRecurring] = useState(false);

  let defaultWinner = '';

  if (props.winnerDescription !== '') {
    defaultWinner = props.winnerDescription;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography className={classes.title}>
            Tell your pool members who will be qualified to get the pool reward
          </Typography>
          <TextField
            required
            variant="outlined"
            fullWidth
            defaultValue={defaultWinner}
            placeholder="The player who wins the 2 week tournament!"
            helperText="Who will get the reward?"
            onChange={(event) =>
              props.setPool({ winnerDescription: event.target.value })
            }
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="lock-value"
            label="Lock value"
            variant="outlined"
            defaultValue={props.lockValue}
            fullWidth
            type="number"
            helperText="The amount of DAI each user will lock"
            onChange={(event) => {
              props.setPool({ lockValue: event.target.value });
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography>Is the reward recurring?</Typography>
          <Checkbox
            onChange={(event) => {
              setIsPrizeRecurring(event.target.checked);
            }}
          />
          <Typography variant="caption" className={classes.title}>
            Recurring reward should be handed out at specific intervals
          </Typography>
          <div className={classes.slider}>
            <Slider
              disabled={!isPrizeRecurring}
              min={1}
              max={62}
              value={props.rewardDuration}
              getAriaValueText={sliderValueText}
              aria-labelledby="discrete-slider-custom"
              step={1}
              valueLabelDisplay="auto"
              marks={sliderMarks}
              onChange={(event, newValue) =>
                props.setPool({ rewardDuration: newValue })
              }
            />
          </div>
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
