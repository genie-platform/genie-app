import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
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

const FundExtraForm = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.title}>
            Tell your fund members who will be qualified to get the fund prize
          </Typography>
          <TextField
            required
            variant="outlined"
            fullWidth
            placeholder="The player who wins the 2 week tournament!"
            helperText="Who will get the prize?"
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classes.title}>
            How long will the fund last?
          </Typography>
          <Typography variant="caption">
            Once the fund ends, each user will get his DAI back
          </Typography>
          <div className={classes.slider}>
            <Slider
              min={1}
              max={62}
              defaultValue={7}
              getAriaValueText={sliderValueText}
              aria-labelledby="discrete-slider-custom"
              step={1}
              valueLabelDisplay="auto"
              marks={sliderMarks}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.createdFund.name,
    description: state.createdFund.description,
    lockValue: state.createdFund.lockValue,
    icon: state.createdFund.icon,
    coverImage: state.createdFund.coverImage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFund: (fundDetails) =>
      dispatch({
        type: actionTypes.SET_FUND,
        name: fundDetails.name,
        description: fundDetails.description,
        lockValue: fundDetails.lockValue,
        icon: fundDetails.icon,
        coverImage: fundDetails.coverImage,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FundExtraForm);
