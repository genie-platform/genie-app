import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions/actionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2em',
  },
}));

const FundExtraForm = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card>
        Currently nothing's here. We will leave this one blank for now. Well
        maybe we can add a little something. Here are some fun alpaca facts:
        There are only two different breeds of alpacas. Alpacas are related to
        more than llamas. They belong to the Camelidae family, which also
        includes Camels. Most alpacas are 48-54 inches tall and can weigh
        anywhere from 106 to 185 pounds.Since they are a completely domesticated
        animal, alpacas can live for a pretty long time. If they are taken care
        of really well, they can live for up to 20 years or so. Another way you
        can tell an alpaca from a llama (other than their size, of course) is
        their ears. If you look closely, you will notice that alpacas have
        shorter, straighter ears than a llama. Just don’t get too close! Both of
        these animals are known to spit if they get annoyed. Yuck!
      </Card>
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
