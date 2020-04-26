import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { connect } from 'react-redux'

import * as actionTypes from '../../store/actions/actionTypes'

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  googleLogin: {

  }
}))

const Header = (props) => {
  const classes = useStyles()

  // event handler for google signin
  const onSignIn = (googleUser) => {
    const tokenId = googleUser.getAuthResponse().id_token

    if (tokenId) {
      // send the token id to backend and update state
      window
        .fetch('http://localhost:3000/api/v1/login/google', {
          method: 'POST',
          body: JSON.stringify({ tokenId }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then((data) => {
          const profile = googleUser.getBasicProfile()

          const userDetails = {
            token: data.token,
            userId: profile.getId(),
            name: profile.getGivenName(),
            imageUrl: profile.getImageUrl()
          }

          console.log(userDetails)
          props.onSignInSuccess(userDetails) // dispatch to update state
        })
    }
  }

  // event handler for google signin failure
  const onFailure = (error) => {
    console.log('FAILED TO SIGN IN', error)
  }

  const signOut = () => {
    var auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
      console.log('User signed out.')

      // update state
      props.onSignOut()

      console.log('is auth:', props.isAuthenticated)
      console.log('token:', props.token)
    })
  }

  useEffect(() => {
    // customized dynamic render of the google signin button
    window.gapi.signin2.render('my-signin2', {
      theme: 'light',
      onsuccess: onSignIn,
      onfailure: onFailure
    })
  }, [])

  console.log('is auth:', props.isAuthenticated)

  const googleSigninButton = <div id='my-signin2' className={classes.googleLogin} />

  const userAvatar = <Avatar alt={props.name} src={props.imageUrl} onClick={signOut} />

  return (
    <div className={classes.header}>
      <div>Genie</div>
      {props.isAuthenticated ? userAvatar : googleSigninButton}
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
        type: actionTypes.AUTH_SUCCESS,
        token: userDetails.token,
        userId: userDetails.userId,
        name: userDetails.name,
        imageUrl: userDetails.imageUrl
      }),
    onSignOut: () => dispatch({ type: actionTypes.AUTH_SIGNOUT })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
