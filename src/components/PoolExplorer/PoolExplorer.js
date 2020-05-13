import React from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from 'react-use';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import PoolDisplayCardWide from '../PoolDisplayCard/PoolDisplayCardWide';
import { fetchAllPools } from '../../ethereum/pool';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
  },
  link: {
    textDecoration: 'none',
  },
}));

const PoolExplorer = (props) => {
  const classes = useStyles();

  const poolsMetadata = useAsync(async () => {
    return fetchAllPools();
  }, []);

  console.log(poolsMetadata.value);

  const poolCards =
    poolsMetadata.value &&
    poolsMetadata.value.map((pool) => (
      <Link to={`/dashboard/${pool.contractAddress}`} className={classes.link}>
        <PoolDisplayCardWide
          name={pool.name}
          description={pool.description}
          icon={pool.icon}
          key={pool.contractAddress}
        />
      </Link>
    ));

  return (
    <div className={classes.root}>
      <Typography>Explore</Typography>
      {poolsMetadata.loading ? (
        <div>Loading...</div>
      ) : poolsMetadata.error ? (
        <div>Error: {poolsMetadata.error.message}</div>
      ) : (
        <>{poolCards}</>
      )}
    </div>
  );
};

export default PoolExplorer;
