import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

import { getWeb3 } from '../../services/web3';
import { NETWORKS_ID } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1.5em',
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    textAlign: 'center',
    width: 400,
    height: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
}));

const WrongNetorkModal = (props) => {
  const classes = useStyles();
  const [networkWarningModalOpen, setNetworkWarningModalOpen] = useState(false);

  useEffect(() => {
    const web3 = getWeb3();

    // display warning modal if network isn't kovan
    web3.eth.getChainId().then((chainId) => {
      if (chainId !== NETWORKS_ID.KOVAN) {
        setNetworkWarningModalOpen(true);
      }
    });
  }, [props.address]);

  const modalBody = (
    <div className={classes.body}>
      <Typography variant="h5">Wrong network!</Typography>
      <Typography variant="h5">
        Please change your ethereum network to Kovan
      </Typography>
    </div>
  );
  return (
    <Modal
      open={networkWarningModalOpen}
      onClose={() => setNetworkWarningModalOpen(false)}
      aria-labelledby="tx-confirm-modal"
      aria-describedby="tx-confirm-modal"
      className={classes.root}
    >
      {modalBody}
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    address: state.auth.address,
  };
};

export default connect(mapStateToProps, null)(WrongNetorkModal);
