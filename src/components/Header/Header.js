import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { connect } from 'react-redux';
import { gapi } from 'gapi-script';

import * as actionTypes from '../../store/actions/actionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.customColors.dark,
  },
  logo: {
    flexGrow: 1,
    color: theme.palette.secondary.light,
    cursor: 'pointer',
  },
  authArea: {
    display: 'flex',
  },
  googleLogin: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  walletButton: {
    borderRadius: 25,
    marginRight: '1em',
    backgroundImage: theme.customGradients.secondary,
  },
  userDetails: {
    cursor: 'pointer',
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const [anchorElement, setAnchorElement] = React.useState(null);

  const handleClickAvatar = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseAvatarMenu = () => {
    setAnchorElement(null);
  };

  // event handler for google signin
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
            tokenId: tokenId,
            userId: profile.getId(),
            name: profile.getGivenName(),
            imageUrl: profile.getImageUrl(),
          };

          props.onSignInSuccess(userDetails); // dispatch to update state
        });
    }
  };

  // event handler for google signin failure
  const onFailure = (error) => {
    console.log('FAILED TO SIGN IN', error);
  };

  const signOut = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');

      // update state
      props.onSignOut();
    });
  };

  const renderGoogleSignInButton = () => {
    // customized dynamic render of the google signin button
    gapi.signin2.render('signinButton', {
      theme: 'light',
      onsuccess: onSignIn,
      onfailure: onFailure,
    });
  };

  useEffect(() => {
    if (!props.isAuthenticated) {
      renderGoogleSignInButton();
    }
  }, [props.isAuthenticated]);

  const googleSigninButton = (
    <div id="signinButton" className={classes.googleLogin} />
  );

  const userAvatar = (
    <div onClick={handleClickAvatar} className={classes.userDetails}>
      <Avatar alt={props.name} src={props.imageUrl} />
    </div>
  );

  const authArea = (
    <div className={classes.authArea}>
      <Button className={classes.walletButton} variant="contained" size="small">
        Connect wallet
        <AccountBalanceWalletIcon />
      </Button>
      {props.isAuthenticated ? null : googleSigninButton}
      {props.isAuthenticated ? userAvatar : null}
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static" color="secondary">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.logo}
            onClick={() => props.history.push('/')}
          >
            Genie
          </Typography>
          {authArea}
          <Menu
            id="simple-menu"
            anchorEl={anchorElement}
            keepMounted
            open={Boolean(anchorElement)}
            onClose={handleCloseAvatarMenu}
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem onClick={handleCloseAvatarMenu}>Profile</MenuItem>
            <MenuItem onClick={handleCloseAvatarMenu}>My account</MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseAvatarMenu();
                signOut();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
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
        type: actionTypes.AUTH_SUCCESS,
        token: userDetails.token,
        userId: userDetails.userId,
        name: userDetails.name,
        imageUrl: userDetails.imageUrl,
      }),
    onSignOut: () => dispatch({ type: actionTypes.AUTH_SIGNOUT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
