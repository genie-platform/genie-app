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
          to="/dashboard/0x1aa4d35ab874b4dff6e52a1953e5bc81fef0363f"
          className={classes.link}
        >
          <PoolDisplayCard clickable name="Path of Exile Race" icon="🧙‍♂️" />
        </Link>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Link
          to="/dashboard/0x63a86b3782de1df7e547fd78ab872b25ec3d60e6"
          className={classes.link}
        >
          <PoolDisplayCard clickable name="Space Survival" icon="☄️" />
        </Link>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Link
          to="/dashboard/0x94e8adb309b629a4a3dfe5534681c034693bf481"
          className={classes.link}
        >
          <PoolDisplayCard clickable name="Volcano Mania" icon="🌋" />
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
