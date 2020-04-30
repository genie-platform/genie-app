import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 10,
    maxWidth: (props) => (props.wide ? 400 : 250),
    position: 'relative',
  },
  media: {
    height: 100,
  },
  content: {
    height: '10%',
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    position: 'absolute',
    right: '8%',
    top: '25%',
  },
  divider: {
    margin: '0.5em 0',
  },
  clickable: {
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.2)',
    },
  },
}));

const FundDisplayCard = (props) => {
  const classes = useStyles(props);

  const showDivider = Boolean(
    props.lockValue || props.winner || props.rewardDuration
  );

  return (
    <Card
      className={clsx(classes.root, props.clickable && classes.clickable)}
      elevation={4}
    >
      <CardMedia
        className={classes.media}
        component="img"
        image={props.image}
      />
      <Typography variant="h3" className={classes.icon}>
        {props.icon}
      </Typography>
      <CardContent className={classes.content}>
        <Typography variant="button">{props.name}</Typography>
        <Typography variant="caption">
          {props.description ? props.description : '-'}
        </Typography>
        {showDivider ? <Divider className={classes.divider} /> : null}

        <Typography variant="caption">
          {props.rewardDuration
            ? `Reward will be handed every ${props.rewardDuration} days`
            : ''}
        </Typography>
        <Typography variant="caption">
          {props.lockValue ? `${props.lockValue} DAI to join fund` : ''}
        </Typography>
        <Typography variant="caption">
          {props.winner ? `winner: ${props.winner}` : ''}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FundDisplayCard;
