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

import { winningConditionTypes, GAMES } from '../../utils/constants';
import { generateGenieToken, shortenAddress } from '../../utils/utils';
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
import PathofexileModal from './Modals/PathofexileModal';
import ConfirmTxModal from '../UI/ConfirmTxModal';

const GET_POOL = gql`
  query Pool($poolAddress: String!) {
    pool(id: $poolAddress) {
      address
      totalStaked
      numberOfPlayers
    }
  }
`;

const GET_REWARDS = gql`
  query getRewards($poolAddress: String!) {
    rewards(where: { pool: $poolAddress }) {
      id
      txHash
      createdAt
      pool
      amount
      receiver
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
    overflow: 'hidden',
  },
  title: {
    fontWeight: 'bold',
    paddingBottom: '0.8em',
    textAlign: 'center',
  },
  desc: {
    color: theme.customColors.lightText,
    paddingBottom: '0.8em',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '550px',
    },
  },
  bar: {
    paddingTop: '2em',
    paddingBottom: '4em',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: '40%',
    },
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
    minHeight: 300,
    position: 'relative',
    overflow: 'hidden',
    '&> img': {
      position: 'absolute',
      top: '-100px',
      width: '100%',
      minHeight: 300,
      [theme.breakpoints.down('sm')]: {
        width: '100vh',
      },
    },
  },
  button: {},
  poeWinner: {
    textAlign: 'center',
  },
  token: {
    paddingTop: '2em',
  },
  rewardsTitle: {
    letterSpacing: '3px',
    fontWeight: 'bold',
    color: '#797979',
  },
  accountAddress: {
    fontSize: '22px',
    fontWeight: 500,
    color: '#3F3F3F',
  },
}));

const PoolDashboard = ({
  match: {
    params: { poolAddress },
  },
  address,
}) => {
  const classes = useStyles();
  const [allowDaiModalOpen, setAllowDaiModalOpen] = useState(false);
  const [stakeDaiModalOpen, setStakeDaiModalOpen] = useState(false);
  const [pathofExileModalOpen, setPathofExileModalOpen] = useState(false);
  const [confirmTxModalOpen, setConfirmTxModalOpen] = useState(false);
  const [didStake, setDidStake] = useState(false);
  const [poeAccountName, setPoeAccountName] = useState('');

  const currentPrizeState = useAsync(async () => {
    return getCurrentPrize(poolAddress);
  }, [poolAddress, didStake]);

  const poolMetadataState = useAsync(async () => {
    return fetchPoolMetadata(poolAddress);
  }, [poolAddress, didStake]);

  const balanceState = useAsync(async () => {
    return balanceOf(poolAddress);
  }, [poolAddress, address, didStake]);

  const userBalance = useAsync(async () => {
    return getUserBalance(address);
  }, [address]);

  const poolGraphState = useQuery(GET_POOL, {
    variables: { poolAddress },
  });

  const rewardsState = useQuery(GET_REWARDS, {
    variables: { poolAddress },
  });

  const didAllowDai = useAsync(async () => {
    const allowance = await getAllowance(address, poolAddress);
    return parseFloat(allowance) >= poolMetadataState.value.lockValue;
  }, [address, poolAddress, poolMetadataState]);

  const game = useAsync(async () => {
    return poolMetadataState.value.game;
  }, [poolMetadataState]);

  const joinPool = async () => {
    if (game.value === GAMES.PATH_OF_EXILE) {
      // open the pathofexile modal to get path of exile data
      setPathofExileModalOpen(true);
    } else {
      joinPoolModals();
    }
  };

  const joinPoolModals = async () => {
    if (!didAllowDai.value) {
      setAllowDaiModalOpen(true);
    } else {
      setStakeDaiModalOpen(true);
    }
  };

  const leavePool = async () => {
    setConfirmTxModalOpen(true);
    await withdraw(address, poolAddress);
    setConfirmTxModalOpen(false);
    setDidStake((didStake) => !didStake);
    poolGraphState.refetch();
  };

  const isGameOver = () => get(rewardsState, 'data.rewards', []).length > 0;

  let winner;
  if (poolMetadataState.value) {
    const { winningCondition } = poolMetadataState.value;
    if (game.value === GAMES.PATH_OF_EXILE) {
      if (winningCondition.type === winningConditionTypes.LEVEL) {
        winner = (
          <Typography variant="h6" className={classes.poeWinner}>
            The pool winner is the first character that will reach level {''}
            {winningCondition.value} on {winningCondition.league} league
          </Typography>
        );
      } else if (winningCondition.type === winningConditionTypes.CHALLENGES) {
        winner = (
          <Typography>
            The pool winner is the first character that will complete
            {winningCondition.value} challenges on {winningCondition.league}{' '}
            league
          </Typography>
        );
      }
    }
  }

  return (
    <div className={classes.root}>
      {poolMetadataState.value && (
        <>
          <div className={classes.cover}>
            <img
              src={poolMetadataState.value.coverImage}
              alt="cover"
              className={classes.coverImg}
            />
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
          {winner}
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
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Typography variant="subtitle1" className={classes.barTitle}>
            Current reward
          </Typography>
          <Typography component="h2" className={classes.barValue}>
            ${Math.round(currentPrizeState.value * 10000) / 10000}
          </Typography>
        </Grid>
        {get(poolMetadataState, 'value.rewardDuration') && (
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
            <Typography variant="subtitle1" className={classes.barTitle}>
              Next distribution
            </Typography>
            <Typography component="h2" className={classes.barValue}>
              {get(poolMetadataState, 'value.rewardDuration')} days
            </Typography>
          </Grid>
        )}
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Typography variant="subtitle1" className={classes.barTitle}>
            # of players
          </Typography>
          <Typography component="h2" className={classes.barValue}>
            {get(poolGraphState, 'data.pool.numberOfPlayers')}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
          <Typography variant="subtitle1" className={classes.barTitle}>
            Total staked
          </Typography>
          <Typography component="h2" className={classes.barValue}>
            ${fromWei(get(poolGraphState, 'data.pool.totalStaked', ''))}
          </Typography>
        </Grid>
        {poolMetadataState.value && (
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
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
        (balanceState.value === '0' || address === null ? (
          <>
            {!isGameOver() && (
              <MainButton
                className={classes.button}
                onClick={joinPool}
                disabled={address === null}
                tooltip={
                  address === null ? 'Connect wallet to join pool' : null
                }
              >
                Join the pool
              </MainButton>
            )}
          </>
        ) : (
          <>
            <MainButton
              className={classes.button}
              onClick={leavePool}
              warning="true"
            >
              Leave the pool
            </MainButton>
            {game && game.value === GAMES.PATH_OF_EXILE && (
              <Typography variant="h6" className={classes.token}>
                You character token is{' '}
                {generateGenieToken(address, poolAddress)}
              </Typography>
            )}
          </>
        ))}
      {get(rewardsState, 'data.rewards', []).length > 0 && (
        <>
          <Typography variant="h5" className={classes.rewardsTitle}>
            Game is over!
          </Typography>
          <Grid
            className={classes.bar}
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.accountAddress}>
                Winner
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" className={classes.accountAddress}>
                Reward
              </Typography>
            </Grid>

            {get(rewardsState, 'data.rewards', []).map((reward, i) => (
              <>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    className={classes.accountAddress}
                  >
                    {shortenAddress(reward.receiver)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" className={classes.barTitle}>
                    ${fromWei(reward.amount)}
                  </Typography>
                </Grid>
              </>
            ))}
          </Grid>
        </>
      )}
      {poolMetadataState.value && userBalance.value && (
        <AllowDaiModal
          open={allowDaiModalOpen}
          onClose={() => setAllowDaiModalOpen(false)}
          lockValue={poolMetadataState.value.lockValue}
          userBalance={userBalance.value}
          onAllowDaiClick={async () => {
            setAllowDaiModalOpen(false);
            setConfirmTxModalOpen(true);
            await approve(address, poolAddress);
            setConfirmTxModalOpen(false);
            setStakeDaiModalOpen(true);
          }}
        />
      )}
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
              address,
              poolAddress,
              poolMetadataState.value.lockValue,
              `${poeAccountName}#${generateGenieToken(address, poolAddress)}`
            );
            setConfirmTxModalOpen(false);
            setDidStake((didStake) => !didStake);
            poolGraphState.refetch();
          }}
        />
      )}
      <ConfirmTxModal
        open={confirmTxModalOpen}
        onClose={() => setConfirmTxModalOpen(false)}
      />
      <PathofexileModal
        address={address}
        poolAddress={poolAddress}
        open={pathofExileModalOpen}
        onClose={() => setPathofExileModalOpen(false)}
        onEnterAccount={(accountName) => {
          setPoeAccountName(accountName);
          joinPoolModals();
        }}
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
