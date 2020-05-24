import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  heroGridItem: {
    padding: '0',
  },
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundImage: theme.customGradients.primary,
    height: '27em',
  },
  heroTitle: {
    width: theme.customValues.bigTitleWidth,
    color: 'white',
    fontWeight: '700',
  },
  heroSubTitle: {
    paddingTop: '1em',
    width: theme.customValues.bigTitleWidth,
    color: 'white',
  },
}));

const Hero = (props) => {
  const classes = useStyles();

  return (
    <Grid id="hero" item xs={12} style={{ padding: 0 }}>
      <div className={classes.hero}>
        <Typography className={classes.heroTitle} variant="h3">
          No-loss reward platform
        </Typography>
        <Typography className={classes.heroTitle} variant="h3"></Typography>
        <Typography className={classes.heroSubTitle} variant="h6">
          Genie is integrated with popular online games and enables
          community-driven tournaments and challenges. The rewards are generated
          by the accrued interest of users' stake.
        </Typography>
      </div>
    </Grid>
  );
};

export default Hero;
