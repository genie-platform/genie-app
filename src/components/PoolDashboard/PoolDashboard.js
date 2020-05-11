import React from 'react';
import {useAsync} from 'react-use';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { fromWei } from 'web3-utils'
import get from 'lodash/get'

import { getCurrentPrize, fetchPoolMetadata } from '../../ethereum/pool';
import MainButton from '../UI/MainButton';

const GET_POOL = gql`
  query Pool($poolAddress: String!) {
    funding(id: $poolAddress) {
      address,
      totalStaked,
      numberOfPlayers
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    fontSize: '2.25em',
    fontWeight: 'bold',
    lineHeight: '2em',
    paddingBottom: '0.2em',
  },
  desc: {
    width: '550px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.customColors.text,
  },
  bar: {
    display: 'flex',
    padding: '30px',
    '&> div': {
      padding: '10px'
    },
  },
  barTitle: {
    color: theme.customColors.text,
    padding: '5px',
  },
  barValue: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    padding: '5px',
  },
  cover: {
    width: '100%',
    height: '300px',
    position: 'relative',
    overflow: 'hidden',
    '&> img': {
      position: 'absolute',
      top: '-300px',
      width: '100%'
    }
  }
}));

const PoolDashboard = ({ match: { params: { poolAddress }}}) => {
  const classes = useStyles();

  const currentPrizeState = useAsync(async () => {
    return getCurrentPrize(poolAddress)
  }, [poolAddress]);

  const poolMetadataState = useAsync(async () => {
    return fetchPoolMetadata(poolAddress)
  }, [poolAddress]);

  const { loading, error, data } = useQuery(GET_POOL, {
    variables: { poolAddress }
  });

  // console.log(poolMetadataState)
  // {Math.round

  return (
    <div className={classes.root}>
        {poolMetadataState.value &&
            <>
              <div className={classes.cover}>
                <img src={poolMetadataState.value.coverImage} />
              </div>
              <Typography variant="h4" className={classes.title}>
                {poolMetadataState.value.name}
              </Typography>
              {/* <div className={classes.title}>{poolMetadataState.value.name}</div> */}
              <div className={classes.desc}>{poolMetadataState.value.description}</div>
            </>
        }
        <div className={classes.bar}>
          <div>
            <div className={classes.barTitle}>Current prizepool</div>
            <div className={classes.barValue}>${Math.round(currentPrizeState.value * 10000) / 10000}</div>
          </div>
          <div>
            <div className={classes.barTitle}>Next distribution</div>
            <div className={classes.barValue}>{get(poolMetadataState, 'value.rewardDuration')} days</div>
          </div>
          <div>
            <div className={classes.barTitle}># of players</div>
            <div className={classes.barValue}>{get(data, 'funding.numberOfPlayers')}</div>
          </div>
          <div>
            <div className={classes.barTitle}>Total staked</div>
            <div className={classes.barValue}>${fromWei(get(data, 'funding.totalStaked', ''))}</div>
          </div>
        </div>
        <div>
          <MainButton>Join the pool</MainButton>
        </div>
    </div>
  )

}

export default PoolDashboard;
