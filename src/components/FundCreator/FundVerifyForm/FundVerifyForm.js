import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import FundDisplayCard from '../../FundDisplayCard/FundDisplayCard';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2em',
  },
}));

const FundVerifyForm = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>Verify fund details:</Typography>
      <Typography>Fund name: {props.name}</Typography>
      <Typography>Fund description: {props.description}</Typography>
      <Typography>Lock value: {props.lockValue}</Typography>
      <FundDisplayCard
        image={props.coverImage}
        name={props.name}
      ></FundDisplayCard>
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

export default connect(mapStateToProps, null)(FundVerifyForm);
