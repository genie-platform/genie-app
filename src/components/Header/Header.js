import React, { useEffect } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
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

import Portis from '@portis/web3';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

import * as actionTypes from '../../store/actions/actionTypes';
import { shortenAddress } from '../../utils/utils';
import { config } from '../../config/config';

const providerOptions = {
  portis: {
    package: Portis,
    options: {
      id: '1dfd0507-d018-4312-9bc1-011aa7c76450',
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: theme.customValues.contentWidth,
    margin: 'auto',
  },
  appBar: {
    backgroundColor: 'white',
    height: 93,
    boxShadow: '0 0',
    borderBottom: 'solid 1px rgba(160,160,160,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbar: {
    width: '72%',
  },
  logo: {
    paddingRight: '0.3em',
    cursor: 'pointer',
  },
  logoText: {
    color: theme.customColors.text,
    cursor: 'pointer',
    fontWeight: '700',
    letterSpacing: '0.2em',
    paddingRight: '1.6em',
  },
  link: {
    color: theme.customColors.text,
    padding: '0 0.8em',
    textDecoration: 'none',
    fontWeight: '500',
  },
  linkActive: {
    color: theme.palette.primary.main,
  },
  divider: {
    flexGrow: 1,
  },
  authArea: {
    display: 'flex',
    alignItems: 'center',
  },
  googleLogin: {
    borderRadius: 50,
    overflow: 'hidden',
    height: 52,
    border: '1px solid rgba(160,160,160,0.2);',
  },
  walletButton: {
    borderRadius: 50,
    marginRight: '1em',
    background: 'white',
    color: theme.customColors.text,
    height: 52,
    width: 165,
    boxShadow: 'none',
    border: '1px solid rgba(160,160,160,0.2);',
    textTransform: 'none',
  },
  userDetails: {
    cursor: 'pointer',
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const [anchorElement, setAnchorElement] = React.useState(null);
  const [address, setAddress] = React.useState(null);

  const web3Modal = new Web3Modal({
    network: 'kovan',
    cacheProvider: true,
    providerOptions,
  });

  const onConnect = async () => {
    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    setAddress(accounts[0]);
  };

  const onWalletClick = async () => {
    if (!address) {
      onConnect();
    } else {
      // open menu
    }
  };

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
        .fetch(`${config.backend.url}/login/google`, {
          method: 'POST',
          mode: 'cors',
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
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');

      // update state
      props.onSignOut();
    });
  };

  const renderGoogleSignInButton = () => {
    gapi.load('auth2', function () {
      const auth2 = gapi.auth2.init({ client_id: config.googleAuth.clientId });
    });

    // customized dynamic render of the google signin button
    gapi.signin2.render('signinButton', {
      theme: 'light',
      onsuccess: onSignIn,
      onfailure: onFailure,
      height: 52,
      width: 140,
    });
  };

  useEffect(() => {
    if (!props.isAuthenticated) {
      renderGoogleSignInButton();
    }
    if (web3Modal.cachedProvider) {
      onConnect();
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
      <Button
        className={classes.walletButton}
        onClick={onWalletClick}
        variant="outlined"
        size="small"
      >
        {address ? shortenAddress(address) : 'Connect Wallet'}
        <AccountBalanceWalletIcon />
      </Button>
      {props.isAuthenticated ? null : googleSigninButton}
      {props.isAuthenticated ? userAvatar : null}
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static" color="secondary">
        <Toolbar className={classes.toolbar}>
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          <Typography
            variant="h3"
            className={classes.logo}
            onClick={() => props.history.push('/')}
          >
            🧞
          </Typography>
          <Typography
            variant="h5"
            className={classes.logoText}
            onClick={() => props.history.push('/')}
          >
            genie
          </Typography>
          <NavLink
            className={classes.link}
            to="/explore"
            activeClassName={classes.linkActive}
          >
            Explore
          </NavLink>
          <NavLink
            className={classes.link}
            to="/create-pool"
            activeClassName={classes.linkActive}
          >
            Create Pool
          </NavLink>
          <NavLink
            className={classes.link}
            to="/my-pools"
            activeClassName={classes.linkActive}
          >
            My Pools
          </NavLink>
          <div className={classes.divider}></div>
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
