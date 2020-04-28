import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'

import * as actionTypes from '../../../store/actions/actionTypes'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2em'
  }
}))

const FundExtraForm = props => {

}

const mapStateToProps = (state) => {
  return {
    name: state.createdFund.name,
    description: state.createdFund.description,
    lockValue: state.createdFund.lockValue,
    icon: state.createdFund.icon,
    coverImage: state.createdFund.coverImage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFund: (fundDetails) =>
      dispatch({
        type: actionTypes.SET_FUND,
        name: fundDetails.name,
        description: fundDetails.description,
        lockValue: fundDetails.lockValue,
        icon: fundDetails.icon,
        coverImage: fundDetails.coverImage
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FundExtraForm)
