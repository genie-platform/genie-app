import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

import * as actionTypes from "../../../store/actions/actionTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
  },
}));

const FundDetailsForm = (props) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <TextField
          required
          id="fund-name"
          label="Fund name"
          variant="outlined"
          fullWidth
          onChange={(event) => props.setFund({ name: event.target.value })}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          multiline
          id="fund-description"
          label="Fund description"
          variant="outlined"
          fullWidth
          onChange={(event) => {
            props.setFund({ description: event.target.value });
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          id="lock-value"
          label="Lock value"
          variant="outlined"
          fullWidth
          type="number"
          helperText="The amount the user will lock"
          onChange={(event) => {
            props.setFund({ lockValue: event.target.value });
          }}
        />
      </Grid>
    </Grid>
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
        payload: {
          name: fundDetails.name,
          description: fundDetails.description,
          lockValue: fundDetails.lockValue,
        },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FundDetailsForm);
