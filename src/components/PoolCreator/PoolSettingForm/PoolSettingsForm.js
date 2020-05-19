import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions/actionTypes';

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    color: theme.customColors.text,
    paddingBottom: '0.2em',
  },
  winningValue: {
    marginTop: '2em',
  },
}));

const winningConditionTypes = { LEVEL: 'level', CHALLENGES: 'challenges' };
const LEVELS = [...Array(100 + 1).keys()].splice(1);
const CHALLENGES = [...Array(40 + 1).keys()];

const PoolSettingsForm = (props) => {
  const classes = useStyles();
  const [winningCondition, setWinningCondition] = useState({
    type: winningConditionTypes.LEVEL,
    value: 100,
  });

  useEffect(() => {
    props.setPool({ winningCondition: winningCondition });
  }, []);

  const verifyWinningValue = (value) => {
    if (winningCondition.type === winningConditionTypes.LEVEL) {
      return LEVELS.includes(value);
    }
    if (winningCondition.type === winningConditionTypes.CHALLENGES) {
      return CHALLENGES.includes(value);
    }
  };

  const getHelperText = () => {
    let text = '';
    if (!verifyWinningValue(winningCondition.value)) {
      if (winningCondition.type === winningConditionTypes.LEVEL) {
        text = 'Level should be between 1-100';
      }
      if (winningCondition.type === winningConditionTypes.CHALLENGES) {
        text = 'Challenge should be between 0-40';
      }
    }
    return text;
  };

  const handleChange = (event) => {
    setWinningCondition((prevState) => ({
      type: event.target.value,
      value: prevState.value,
    }));
    props.setPool({ winningCondition: winningCondition });
  };

  const winningConditions = props.game === 'Path of Exile' && (
    <>
      <Grid item xs={12}>
        <Typography className={classes.label}>
          Choose a winning condition:
        </Typography>
        <TextField
          variant="outlined"
          select
          fullWidth
          defaultValue={winningConditionTypes.LEVEL}
          onChange={handleChange}
          SelectProps={{ value: winningCondition.type }}
        >
          <MenuItem value={winningConditionTypes.LEVEL}>
            The first character to reach level
          </MenuItem>
          <MenuItem value={winningConditionTypes.CHALLENGES}>
            The first character to complete league challenges
          </MenuItem>
        </TextField>
        <TextField
          className={classes.winningValue}
          error={!verifyWinningValue(winningCondition.value)}
          helperText={getHelperText()}
          type="number"
          variant="outlined"
          defaultValue={winningCondition.value}
          fullWidth
          label={
            winningCondition.type === winningConditionTypes.LEVEL
              ? 'Winning level'
              : '# of challenges to win'
          }
          onChange={(event) => {
            const value = event.target.valueAsNumber;
            setWinningCondition((prevState) => ({
              type: prevState.type,
              value: value,
            }));
            props.setPool({
              winningCondition: winningCondition,
            });
          }}
        ></TextField>
      </Grid>
    </>
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={6}>
        {winningConditions}
        <Grid item xs={12}>
          <Typography className={classes.label}>Ticket Price</Typography>
          <TextField
            required
            id="lock-value"
            defaultValue={props.lockValue}
            helperText="The amount of DAI each user will lock to join pool"
            fullWidth
            type="number"
            variant="outlined"
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
            variant="outlined"
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
    game: state.createdPool.game,
    winningCondition: state.createdPool.winningCondition,
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
          winningCondition: poolDetails.winningCondition,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PoolSettingsForm);
