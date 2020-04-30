import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import FundDisplayCard from '../../FundDisplayCard/FundDisplayCard';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2em',
  },
  title: {
    textAlign: 'center',
  },
  fundCard: {
    display: 'flex',
    justifyContent: 'center',
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const FundVerifyForm = (props) => {
  const classes = useStyles();

  // Call to backend endpoint to create fund on click

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Confirm fund:
      </Typography>
      <div className={classes.margin} />
      <div className={classes.fundCard}>
        <FundDisplayCard
          wide
          image={props.coverImage}
          name={props.name}
          description={props.description}
          icon={props.icon}
          lockValue={props.lockValue}
          winner={props.winnerDescription}
          fundDuration={props.fundDuration}
        />
      </div>
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
    winnerDescription: state.createdFund.winnerDescription,
    fundDuration: state.createdFund.fundDuration,
  };
};

export default connect(mapStateToProps, null)(FundVerifyForm);
