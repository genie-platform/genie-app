import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  text: {
    fontFamily: theme.fonts.primary,
    textAlign: 'center',
    backgroundImage: theme.customGradients.primaryDark,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  createFundButton: {
    borderRadius: '25px',
    color: 'white',
    backgroundImage: theme.customGradients.primaryDark
  }
}))

const Home = (props) => {
  const classes = useStyles()

  const welcomeMessage = 'Welcome to genie'

  return (
    <div>
      <div className={classes.text}>{props.name ? `hello ${props.name}` : null}</div>
      <div className={classes.text}>{welcomeMessage}</div>
      <Button className={classes.createFundButton} variant='contained'>Create a new fund</Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userID,
    name: state.auth.name,
    imageUrl: state.auth.imageUrl,
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignInSuccess: (userDetails) =>
      dispatch({
        type: 'AUTH_SUCCESS',
        token: userDetails.token,
        userId: userDetails.userId,
        name: userDetails.name,
        imageUrl: userDetails.imageUrl
      })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
