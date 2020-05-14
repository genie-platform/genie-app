import React from 'react';
import { useAsync } from 'react-use';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { fromWei } from 'web3-utils';
import get from 'lodash/get';

import { getCurrentPrize, fetchPoolMetadata, balanceOf, deposit, withdraw } from '../../ethereum/pool';
import { getAllowance, approve } from '../../ethereum/erc20';
import web3 from '../../ethereum/web3';
import MainButton from '../UI/MainButton';

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
}) => {
  const classes = useStyles();

  const currentPrizeState = useAsync(async () => {
    return getCurrentPrize(poolAddress);
  }, [poolAddress]);

  const poolMetadataState = useAsync(async () => {
    return fetchPoolMetadata(poolAddress);
  }, [poolAddress]);

  const balanceState = useAsync(async () => {
    return balanceOf(poolAddress);
  }, [poolAddress]);


  console.log({ balanceState })
  const poolGraphState = useQuery(GET_POOL, {
    variables: { poolAddress },
  });

  const joinPool = async () => {
    const accounts = await web3.eth.getAccounts();
    const accountAddress = accounts[0];
    console.log(await getAllowance(accountAddress, poolAddress))
    const allowance = await getAllowance(accountAddress, poolAddress)
    if (parseFloat(allowance) < poolMetadataState.value.lockValue) {
      await approve(accountAddress, poolAddress)
    }
    deposit(accountAddress, poolAddress, poolMetadataState.value.lockValue)
  }

  const leavePool = async () => {
    const accounts = await web3.eth.getAccounts();
    const accountAddress = accounts[0];
    withdraw(accountAddress, poolAddress)
  }

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
          <Typography component="subtitle1" className={classes.desc}>
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
          <Typography component="subtitle1" className={classes.barTitle}>
            Current prize
          </Typography>
          <Typography component="h2" className={classes.barValue}>
            ${Math.round(currentPrizeState.value * 10000) / 10000}
          </Typography>
        </Grid>
        {get(poolMetadataState, 'value.rewardDuration') && (
          <Grid item xs={3}>
            <Typography component="subtitle1" className={classes.barTitle}>
              Next distribution
            </Typography>
            <Typography component="h2" className={classes.barValue}>
              {get(poolMetadataState, 'value.rewardDuration')} days
            </Typography>
          </Grid>
        )}
        <Grid item xs={3}>
          <Typography component="subtitle1" className={classes.barTitle}>
            # of players
          </Typography>
          <Typography component="h2" className={classes.barValue}>
            {get(poolGraphState, 'data.funding.numberOfPlayers')}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography component="subtitle1" className={classes.barTitle}>
            Total staked
          </Typography>
          <Typography component="h2" className={classes.barValue}>
            ${fromWei(get(poolGraphState, 'data.funding.totalStaked', ''))}
          </Typography>
        </Grid>
      </Grid>
      {
        !balanceState.loading && (
          balanceState.value === '0'
          ? <MainButton onClick={joinPool}>Join the pool</MainButton>
          : <MainButton onClick={leavePool}>Leave the pool</MainButton>
        )
      }
    </div>
  );
};

export default PoolDashboard;
