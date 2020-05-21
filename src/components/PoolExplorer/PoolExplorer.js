import React from 'react';
import { Link } from 'react-router-dom';
import { useAsync } from 'react-use';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import PoolDisplayCardWide from '../PoolDisplayCard/PoolDisplayCardWide';
import { fetchAllPools } from '../../ethereum/pool';
import ImagePicker from '../UI/ImagePicker';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 'auto',
    width: '50em',
  },
  title: {
    padding: '1.5em 0',
    fontWeight: 'bold',
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

  const poolCards =
    poolsMetadata.value &&
    poolsMetadata.value.map((pool) =>
      pool.contractAddress ? (
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
      ) : null
    );

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Explore
      </Typography>
      {/* <ImagePicker open={true}></ImagePicker> */}
      {poolsMetadata.loading ? (
        <div>Loading...</div>
      ) : poolsMetadata.error ? (
        <div>Error: {poolsMetadata.error.message}</div>
      ) : (
        <Grid container spacing={3}>
          {poolCards}
        </Grid>
      )}
    </div>
  );
};

export default PoolExplorer;
