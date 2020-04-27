import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Stepper from './CustomStepper/CustomStepper'
import FundDetailsForm from './FundDetailsForm/FundDetailsForm'

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
      <Stepper fundDetails={FundDetailsForm} />
    </div>)
}

export default FundCreator
