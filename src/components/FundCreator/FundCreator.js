import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import Stepper from './Stepper/Stepper'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    margin: 'auto',
    borderRadius: 25
  }
}))

const FundCreator = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CardContent>
        <Stepper />
      </CardContent>
    </div>)
}

export default FundCreator
