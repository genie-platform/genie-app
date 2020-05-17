import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { fromWei } from 'web3-utils';
import get from 'lodash/get';

import {
  getCurrentPrize,
  fetchPoolMetadata,
  balanceOf,
  deposit,
  withdraw,
} from '../../ethereum/pool';
import { getAllowance, approve, getUserBalance } from '../../ethereum/erc20';
import MainButton from '../UI/MainButton';
import AllowDaiModal from './Modals/AllowDaiModal';
import StakeDaiModal from './Modals/StakeDaiModal';
import ConfirmTxModal from '../UI/ConfirmTxModal';

const GET_POOL = gql`
  query Pool($poolAddress: String!) {
    funding(id: $poolAddress) {
      address
      totalStaked
      numberOfPlayers
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
  },
  title: {
    fontWeight: 'bold',
    paddingBottom: '0.8em',
  },
  desc: {
    width: '550px',
    color: theme.customColors.lightText,
    paddingBottom: '0.8em',
  },
  bar: {
    width: '40%',
    paddingTop: '2em',
    paddingBottom: '4em',
  },
  barTitle: {
    color: theme.customColors.lightText,
    padding: '5px',
  },
  barValue: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    padding: '5px',
  },
  icon: {
    position: 'relative',
    top: '-0.5em',
    userSelect: 'none',
  },
  cover: {
    width: '100%',
    height: '35vh',
    position: 'relative',
    overflow: 'hidden',
    '&> img': {
      position: 'absolute',
      top: '-300px',
      width: '100%',
    },
  },
}));

const PoolDashboard = ({
  match: {
    params: { poolAddress },
  },
  address: accountAddress,
}) => {
  const classes = useStyles();
  const [allowDaiModalOpen, setAllowDaiModalOpen] = useState(false);
  const [stakeDaiModalOpen, setStakeDaiModalOpen] = useState(false);
  const [confirmTxModalOpen, setConfirmTxModalOpen] = useState(false);
  const [wasDaiApproved, setWasDaiApproved] = useState(false);
  const [didStake, setDidStake] = useState(false);

  const currentPrizeState = useAsync(async () => {
    return getCurrentPrize(poolAddress);
  }, [poolAddress]);

  const poolMetadataState = useAsync(async () => {
    return fetchPoolMetadata(poolAddress);
  }, [poolAddress]);

  const balanceState = useAsync(async () => {
    return balanceOf(poolAddress);
  }, [poolAddress, accountAddress, didStake]);

  const userBalance = useAsync(async () => {
    return getUserBalance(accountAddress);
  }, [accountAddress]);

  const poolGraphState = useQuery(GET_POOL, {
    variables: { poolAddress },
  });

  const joinPool = async () => {
    const allowance = await getAllowance(accountAddress, poolAddress);

    setWasDaiApproved(
      parseFloat(allowance) < poolMetadataState.value.lockValue
    );

    if (!wasDaiApproved) {
      setAllowDaiModalOpen(true);
    } else {
      setStakeDaiModalOpen(true);
    }
  };

  const leavePool = async () => {
    setConfirmTxModalOpen(true);
    await withdraw(accountAddress, poolAddress);
    setConfirmTxModalOpen(false);
    setDidStake(!didStake);
  };

  return (
    <div className={classes.root}>
      {poolMetadataState.value && (
        <>
          <div className={classes.cover}>
            <img src={poolMetadataState.value.coverImage} alt="cover" />
          </div>
          <Typography variant="h1" id="pool-icon" className={classes.icon}>
            {poolMetadataState.value.icon}
          </Typography>
          <Typography variant="h3" className={classes.title}>
            {poolMetadataState.value.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.desc}>
            {poolMetadataState.value.description}
          </Typography>
        </>
      )}
      <Grid
        className={classes.bar}
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={3}>
          <Typography variant="subtitle1" className={classes.barTitle}>
            Current reward
          </Typography>
          <Typography component="h2" className={classes.barValue}>
            ${Math.round(currentPrizeState.value * 10000) / 10000}
          </Typography>
        </Grid>
        {get(poolMetadataState, 'value.rewardDuration') && (
          <Grid item xs={3}>
            <Typography variant="subtitle1" className={classes.barTitle}>
              Next distribution
            </Typography>
            <Typography component="h2" className={classes.barValue}>
              {get(poolMetadataState, 'value.rewardDuration')} days
            </Typography>
          </Grid>
        )}
        <Grid item xs={3}>
          <Typography variant="subtitle1" className={classes.barTitle}>
            # of players
          </Typography>
          <Typography component="h2" className={classes.barValue}>
            {get(poolGraphState, 'data.funding.numberOfPlayers')}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle1" className={classes.barTitle}>
            Total staked
          </Typography>
          <Typography component="h2" className={classes.barValue}>
            ${fromWei(get(poolGraphState, 'data.funding.totalStaked', ''))}
          </Typography>
        </Grid>
        {poolMetadataState.value && (
          <Grid item xs={3}>
            <Typography variant="subtitle1" className={classes.barTitle}>
              Ticket Price
            </Typography>
            <Typography component="h2" className={classes.barValue}>
              ${poolMetadataState.value.lockValue}
            </Typography>
          </Grid>
        )}
      </Grid>
      {!balanceState.loading &&
        (balanceState.value === '0' || accountAddress === null ? (
          <>
            <MainButton
              onClick={joinPool}
              disabled={accountAddress === null}
              tooltip={accountAddress === null && 'Connect wallet to join pool'}
            >
              Join the pool
            </MainButton>
          </>
        ) : (
          <MainButton onClick={leavePool} warning="true">
            Leave the pool
          </MainButton>
        ))}
      <AllowDaiModal
        open={allowDaiModalOpen}
        onClose={() => setAllowDaiModalOpen(false)}
        onAllowDaiClick={async () => {
          setAllowDaiModalOpen(false);
          setConfirmTxModalOpen(true);
          await approve(accountAddress, poolAddress);
          setConfirmTxModalOpen(false);
          setWasDaiApproved(true);
          setStakeDaiModalOpen(true);
        }}
      />
      {poolMetadataState.value && userBalance.value && (
        <StakeDaiModal
          open={stakeDaiModalOpen}
          onClose={() => setStakeDaiModalOpen(false)}
          lockValue={poolMetadataState.value.lockValue}
          userBalance={userBalance.value}
          onStake={async () => {
            setStakeDaiModalOpen(false);
            setConfirmTxModalOpen(true);
            await deposit(
              accountAddress,
              poolAddress,
              poolMetadataState.value.lockValue
            );
            setConfirmTxModalOpen(false);
            setDidStake(!didStake);
          }}
        />
      )}
      <ConfirmTxModal
        open={confirmTxModalOpen}
        onClose={() => setConfirmTxModalOpen(false)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    address: state.auth.address,
  };
};

export default connect(mapStateToProps, null)(PoolDashboard);
