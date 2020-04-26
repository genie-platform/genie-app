import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

// const useStyles = makeStyles((theme) => ({
//   googleLogin: {
//     paddingTop: '30%',
//     display: 'flex',
//     justifyContent: 'center'
//   },
//   text: {
//     fontFamily: theme.fonts.primary,
//     textAlign: 'center',
//     backgroundImage: theme.customGradients.primaryDark,
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent'
//   }
// }))

const Home = (props) => {
  // const classes = useStyles()

  return (
    <div>
      <div>{props.name ? `hello ${props.name}` : null}</div>
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
