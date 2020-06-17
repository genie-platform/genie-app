import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useAsync } from 'react-use';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PoolDisplayCardWide from '../PoolDisplayCard/PoolDisplayCardWide';
import { useAccountPoolsState } from '../../services/thegraph';
import { fetchAllPools } from '../../ethereum/pool';
import { lowercaseAddress } from '../../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 'auto',
    width: '50em',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      overflow: 'hidden',
    },
  },
  title: {
    padding: '1.5em 0',
    fontWeight: 'bold',
  },
  link: {
    textDecoration: 'none',
  },
}));

const MyPools = (props) => {
  const classes = useStyles();
  const joinedPoolsAddresses = [];
  let joinedPools = [];
  let createdPools = [];

  const poolsMetadata = useAsync(async () => {
    return fetchAllPools();
  }, []);

  const accountPools = useAccountPoolsState(props.address);
  const { loading, error } = accountPools;

  if (!loading && !error && !poolsMetadata.loading) {
    // get user pools
    accountPools.data.accountPools.forEach((pool) =>
      joinedPoolsAddresses.push(pool.poolAddress)
    );

    // filter only user joined pools metadata
    joinedPools = poolsMetadata.value.filter((pool) =>
      joinedPoolsAddresses.includes(pool.contractAddress)
    );

    // filter only user created pools metadata
    createdPools = poolsMetadata.value.filter((pool) => {
      return pool.poolOwnerAddress === lowercaseAddress(props.address);
    });
  }

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        My Joined Pools
      </Typography>
      <Grid container spacing={3}>
        {joinedPools.map((pool) => (
          <Grid item xs={12} key={pool._id}>
            <Link
              to={`/dashboard/${pool.contractAddress}`}
              className={classes.link}
            >
              <PoolDisplayCardWide
                name={pool.name}
                description={pool.description}
                icon={pool.icon}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h3" className={classes.title}>
        My Created Pools
      </Typography>
      <Grid container spacing={3}>
        {createdPools.map((pool) => (
          <Grid item xs={12} key={pool._id}>
            <Link
              to={`/dashboard/${pool.contractAddress}`}
              className={classes.link}
            >
              <PoolDisplayCardWide
                name={pool.name}
                description={pool.description}
                icon={pool.icon}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    address: state.auth.address,
  };
};

export default connect(mapStateToProps, null)(MyPools);
