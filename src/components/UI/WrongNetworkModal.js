import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

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

  const modalBody = (
    <div className={classes.body}>
      <Typography variant="h5">
        Wrong network! Please change your ethereum network to Kovan
      </Typography>
    </div>
  );
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="tx-confirm-modal"
      aria-describedby="tx-confirm-modal"
      className={classes.root}
    >
      {modalBody}
    </Modal>
  );
};

export default WrongNetorkModal;
