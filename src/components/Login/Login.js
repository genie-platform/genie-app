import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  login: {
    maxWidth: '500px',
    minWidth: '250px',
    maxHeight: '400px',
    width: '30vw',
    height: '50vh',
    position: 'relative',
    top: '10vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1em',
    display: 'flex',
    flexFlow: 'column',
  },
  content: {
    top: '10%',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '60%',
  },
  titleArea: {},
  googleLogin: {
    paddingTop: '30%',
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    fontFamily: theme.fonts.primary,
    textAlign: 'center',
    backgroundImage: theme.customGradients.primaryDark,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  divider: {
    margin: '5% 0',
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const onSignIn = (googleUser) => {
    const tokenId = googleUser.getAuthResponse().id_token;

    if (tokenId) {
      // send the token id to backend and update state
      window
        .fetch('http://localhost:3000/api/v1/login/google', {
          method: 'POST',
          body: JSON.stringify({ tokenId }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((response) => response.json())
        .then((data) => {
          const profile = googleUser.getBasicProfile();

          const userDetails = {
            token: data.token,
            userId: profile.getId(),
            name: profile.getGivenName(),
            imageUrl: profile.getImageUrl(),
          };

          console.log(userDetails);
          props.onSignInSuccess(userDetails); // dispatch to update state
        });
    }
  };

  const onFailure = (error) => {
    console.log('FAILED TO SIGN IN', error);
  };

  useEffect(() => {
    window.gapi.signin2.render('my-signin2', {
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'light',
      onsuccess: onSignIn,
      onfailure: onFailure,
    });
  }, []);

  return (
    <div>
      <Card className={classes.login}>
        <div className={classes.content}>
          <div className={classes.titleArea}>
            <Typography className={classes.text} variant="h3">
              Genie
            </Typography>
            <Divider className={classes.divider} />
            <Typography className={classes.text}>
              is a plaftorm for game developers to reward their players
            </Typography>
          </div>
          <div id="my-signin2" className={classes.googleLogin} />
          <div>{props.name ? `hello ${props.name}` : null}</div>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userID,
    name: state.auth.name,
    imageUrl: state.auth.imageUrl,
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignInSuccess: (userDetails) =>
      dispatch({
        type: 'AUTH_SUCCESS',
        token: userDetails.token,
        userId: userDetails.userId,
        name: userDetails.name,
        imageUrl: userDetails.imageUrl,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
