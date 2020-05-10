import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import PoolDisplayCard from '../../PoolDisplayCard/PoolDisplayCardOld';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2em',
  },
  title: {
    textAlign: 'center',
  },
  poolCard: {
    display: 'flex',
    justifyContent: 'center',
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const PoolVerifyForm = (props) => {
  const classes = useStyles();

  // Call to backend endpoint to create pool on click

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Verify Pool Details:
      </Typography>
      <div className={classes.margin} />
      <div className={classes.poolCard}>
        <PoolDisplayCard
          wide
          image={props.coverImage}
          name={props.name}
          description={props.description}
          icon={props.icon}
          lockValue={props.lockValue}
          winner={props.winnerDescription}
          rewardDuration={props.rewardDuration}
        />
      </div>
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

export default connect(mapStateToProps, null)(PoolVerifyForm);
