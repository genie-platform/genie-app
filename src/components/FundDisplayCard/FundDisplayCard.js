import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 10,
    maxWidth: 250,
  },
  media: {
    height: 100,
  },
  content: {
    height: '10%',
  },
  clickable: {
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 4px 5px 0px rgba(0,0,0,0.2)',
    },
  },
}));

const FundDisplayCard = (props) => {
  const classes = useStyles();

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
      <CardContent className={classes.content}>
        <Typography>{props.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default FundDisplayCard;
