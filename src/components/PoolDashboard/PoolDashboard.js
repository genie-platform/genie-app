import React from 'react'
import { useAsync } from 'react-use'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { fromWei } from 'web3-utils'
import get from 'lodash/get'

import { getCurrentPrize, fetchPoolMetadata } from '../../ethereum/pool'
import MainButton from '../UI/MainButton'

const GET_POOL = gql`
  query Pool($poolAddress: String!) {
    funding(id: $poolAddress) {
      address
      totalStaked
      numberOfPlayers
    }
  }
`

const useStyles = makeStyles(theme => ({
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
    paddingBottom: '0.2em'
  },
  desc: {
    width: '550px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.customColors.text
  },
  bar: {
    width: '75%',
    // display: 'flex',
    // padding: '30px',
    // '&> div': {
    //   padding: '10px'
    // }
  },
  barTitle: {
    color: theme.customColors.text,
    padding: '5px'
  },
  barValue: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    padding: '5px'
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
}))

const PoolDashboard = ({
  match: {
    params: { poolAddress }
  }
}) => {
  const classes = useStyles()

  const currentPrizeState = useAsync(async () => {
    return getCurrentPrize(poolAddress)
  }, [poolAddress])

  const poolMetadataState = useAsync(async () => {
    return fetchPoolMetadata(poolAddress)
  }, [poolAddress])

  const poolGraphState = useQuery(GET_POOL, {
    variables: { poolAddress }
  })

  return (
    <div className={classes.root}>
      {poolMetadataState.value && (
        <>
          <div className={classes.cover}>
            <img src={poolMetadataState.value.coverImage} />
          </div>
          <Typography variant='h1' id='pool-icon'>
            {poolMetadataState.value.icon}
          </Typography>
          <Typography variant='h2' className={classes.title}>
            {poolMetadataState.value.name}
          </Typography>
          <Typography component='subtitle1' className={classes.desc}>
            {poolMetadataState.value.description}
          </Typography>
        </>
      )}
      <Grid
        className={classes.bar}
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={1}
      >
        <Grid item xs={2}>
          <Typography component='subtitle1' className={classes.barTitle}>
            Current prize
          </Typography>
          <Typography component='h2' className={classes.barValue}>
            ${Math.round(currentPrizeState.value * 10000) / 10000}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography component='subtitle1' className={classes.barTitle}>
            Next distribution
          </Typography>
          <Typography component='h2' className={classes.barValue}>
            {get(poolMetadataState, 'value.rewardDuration')} days
          </Typography>
        </Grid>
        <Grid item xs={2}>
            <Typography component="subtitle1" className={classes.barTitle}># of players</Typography>
            <Typography component="h2" className={classes.barValue}>{get(poolGraphState, 'data.funding.numberOfPlayers')}</Typography>
        </Grid>
        <Grid item xs={1}>
            <Typography component="subtitle1" className={classes.barTitle}>Total staked</Typography>
            <Typography component="h2" className={classes.barValue}>${fromWei(get(poolGraphState, 'data.funding.totalStaked', ''))}</Typography>
        </Grid>
      </Grid>
      {/* 
        <div className={classes.bar}>
          <div>
            <Typography component="subtitle1" className={classes.barTitle}>Current prize</Typography>
            <Typography component="h2" className={classes.barValue}>${Math.round(currentPrizeState.value * 10000) / 10000}</Typography>
          </div>
          <div>
            <Typography component="subtitle1" className={classes.barTitle}>Next distribution</Typography>
            <Typography component="h2" className={classes.barValue}>{get(poolMetadataState, 'value.rewardDuration')} days</Typography>
          </div>
          <div>
            <Typography component="subtitle1" className={classes.barTitle}># of players</Typography>
            <Typography component="h2" className={classes.barValue}>{get(poolGraphState, 'data.funding.numberOfPlayers')}</Typography>
          </div>
          <div>
            <Typography component="subtitle1" className={classes.barTitle}>Total staked</Typography>
            <Typography component="h2" className={classes.barValue}>${fromWei(get(poolGraphState, 'data.funding.totalStaked', ''))}</Typography>
          </div>
        </div> */}
      <div>
        <MainButton>Join the pool</MainButton>
      </div>
    </div>
  )
}

export default PoolDashboard
