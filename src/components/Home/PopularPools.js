import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PoolDisplayCard from '../PoolDisplayCard/PoolDisplayCard';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.customValues.contentWidth,
    width: '100%',
    margin: 'auto',
  },
  subTitle: {
    color: '#797979',
    fontWeight: '600',
    letterSpacing: '0.2em',
  },
  linkButton: {
    color: theme.palette.primary.main,
    fontWeight: '600',
  },
  poolsGrid: {
    paddingTop: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',
  },
}));

const PopularPools = (props) => {
  const classes = useStyles();

  // TODO load pools from backend
  const poolsGrid = (
    <Grid container className={classes.poolsGrid}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Link
          to="/dashboard/0x518e26f9b2ae82f02d53d2100c3c4cfe3b061913"
          className={classes.link}
        >
          <PoolDisplayCard clickable name="Path of Exile Race - Level 10" icon="🧙" />
        </Link>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Link
          to="/dashboard/0x2051e3222677a79026b0f22f86af6631595b4939"
          className={classes.link}
        >
          <PoolDisplayCard clickable name="Path of Exile Race - Level 50" icon="🧙‍♂️‍" />
        </Link>
      </Grid>
    </Grid>
  );
  return (
    <div className={classes.root}>
      <Grid id="popular-pool" item xs={12}>
        <Typography className={classes.subTitle} variant="subtitle2">
          POPULAR CHALLENGES
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {poolsGrid}
      </Grid>
      <Grid item xs={12}>
        <Link to="/explore" className={classes.link}>
          <Button className={classes.linkButton}>Explore more challenges</Button>
        </Link>
      </Grid>
    </div>
  );
};

export default PopularPools;
