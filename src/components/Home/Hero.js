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
    color: 'white',
    fontWeight: '700',
    [theme.breakpoints.up('sm')]: {
      width: theme.customValues.bigTitleWidth,
    },
  },
  heroSubTitle: {
    paddingTop: '1em',
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      width: theme.customValues.bigTitleWidth,
    },
  },
  supportLink: {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    position: 'relative',
    top: '0.25em',
  }
}));

const Hero = (props) => {
  const classes = useStyles();

  return (
    <Grid id="hero" item xs={12} style={{ padding: 0 }}>
      <div className={classes.hero}>
        <Typography className={classes.heroTitle} variant="h3">
          Reward platform for
          <br />
          no-loss challenges
        </Typography>
        <Typography className={classes.heroTitle} variant="h3"></Typography>
        <Typography className={classes.heroSubTitle} variant="h6">
          Genie is integrated with popular online games and enables
          community-driven tournaments and challenges. 
          We want to bridge the universes of crypto and gaming <a className={classes.supportLink} href='https://gitcoin.co/grants/898/genie-challenges-reward-platform' target="_blank" rel="noreferrer noopener">⚔️ you are invited to support our mission ⚔️</a> 
        </Typography>
      </div>
    </Grid>
  );
};

export default Hero;
