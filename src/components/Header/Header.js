import React, { useEffect, useState } from 'react';
import { withRouter, NavLink, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/Drawer';
import LinkMui from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { connect } from 'react-redux';
import { gapi } from 'gapi-script';

import { getWeb3, setWeb3Provider } from '../../services/web3';
import * as actionTypes from '../../store/actions/actionTypes';
import { config } from '../../config/config';
import { NETWORKS } from '../../utils/constants';
import useWeb3Modal from '../../hooks/useWeb3Modal';
import Address from '../UI/Address';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,
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
    width: '85%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  logo: {
    paddingRight: '1em',
    cursor: 'pointer',
    height: 70,
    [theme.breakpoints.down('sm')]: {
      paddingRight: '0.3em',
      height: 50,
    },
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
    textDecoration: 'none',
    fontWeight: '500',
    [theme.breakpoints.up('sm')]: {
      padding: '0 0.8em',
    },
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
  hidden: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
  walletIcon: { paddingLeft: '0.3em' },
  userDetails: {
    cursor: 'pointer',
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const [anchorElement, setAnchorElement] = useState(null);
  const [walletAnchorElement, setWalletAnchorElement] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [portis, setPortis] = useState(null);

  const connect = async (provider) => {
    let web3 = getWeb3(provider);

    const accounts = await web3.eth.getAccounts();
    props.onWalletConnect(accounts[0]); // set address in redux global state

    // if user chose portis, display it
    const portisInstance = provider._portis;

    if (portisInstance) {
      setPortis(portisInstance); // set portis instance state
      // show portis popup
      portisInstance.onLogin((walletAddress, email, reputation) => {
        portis.showPortis();
      });
    }
  };

  const web3Modal = useWeb3Modal(connect);

  const onWalletClick = async (event) => {
    if (!props.address) {
      // open wallets modal
      await web3Modal.core.connect();
    } else {
      // open menu
      setWalletAnchorElement(event.currentTarget);
    }
  };

  const onWalletDisconnet = () => {
    if (portis) {
      portis.logout();
      setPortis(null);
    }
    web3Modal.core.clearCachedProvider();
    props.onWalletConnect(null); // set address in redux global state
    setWeb3Provider(); // reset web3 provider to default provider
  };

  const handleClickAvatar = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
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
    if (web3Modal.core.cachedProvider) {
      web3Modal.core.connect().then();
    }
  }, [props.isAuthenticated]);

  // connect to wallet on component mount
  useEffect(() => {
    if (web3Modal.core.cachedProvider) {
      web3Modal.core.connect().then();
    }
  }, []);

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
      <Hidden implementation="css" xsDown>
        <Button
          className={classes.walletButton}
          onClick={onWalletClick}
          variant="outlined"
          size="small"
        >
          {props.address ? (
            <Address address={props.address} />
          ) : (
            <>
              Connect Wallet
              <AccountBalanceWalletIcon
                color="primary"
                className={classes.walletIcon}
              />
            </>
          )}
        </Button>
      </Hidden>
      {props.isAuthenticated ? null : googleSigninButton}
      {props.isAuthenticated ? userAvatar : null}
    </div>
  );

  const authAreaDrawer = (
    <div>
      <List component="nav" aria-label="">
        <Link to="/" className={classes.link}>
          <ListItem button onClick={() => setIsDrawerOpen(false)}>
            <ListItemText primary="Genie" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List component="nav" aria-label="">
        <ListItem
          button
          onClick={() => {
            if (!props.address) {
              onWalletClick();
            }
            setIsDrawerOpen(false);
          }}
        >
          {props.address ? (
            <Address address={props.address} />
          ) : (
            <>
              <ListItemText primary="Connect Wallet" />
              <AccountBalanceWalletIcon
                color="primary"
                style={{ paddingLeft: '0.8em' }}
              />
            </>
          )}
        </ListItem>
      </List>

      <Divider />
      <List component="nav" aria-label="">
        <Link to="/explore" className={classes.link}>
          <ListItem button onClick={() => setIsDrawerOpen(false)}>
            <ListItemText primary="Explore" />
          </ListItem>
        </Link>
        <Link to="/create-pool" className={classes.link}>
          <ListItem button onClick={() => setIsDrawerOpen(false)}>
            <ListItemText primary="Create pool" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const menuDesktop = (
    <div className={classes.hidden}>
      <Hidden implementation="css" xsDown>
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
          Create pool
        </NavLink>
        {/* <NavLink
  className={classes.link}
  to="/my-pools"
  activeClassName={classes.linkActive}
>
  My Pools
</NavLink> */}
      </Hidden>
      <div className={classes.divider}></div>

      {authArea}

      <Menu
        id="google-menu"
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={() => {
          setAnchorElement(null);
        }}
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
        <MenuItem
          onClick={() => {
            setAnchorElement(null);
            signOut();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      <Menu
        id="wallet-menu"
        anchorEl={walletAnchorElement}
        keepMounted
        open={Boolean(walletAnchorElement)}
        onClose={() => {
          setWalletAnchorElement(null);
        }}
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
        {portis && (
          <MenuItem
            onClick={() => {
              if (portis) {
                portis.showPortis();
              }
              setWalletAnchorElement(null);
            }}
          >
            Show account
          </MenuItem>
        )}
        <MenuItem>
          <LinkMui
            href={`https://${
              config.network.ethereumNetwork === NETWORKS.KOVAN ? 'kovan.' : ''
            }etherscan.io/address/${props.address}`}
            underline="none"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            View on etherscan
          </LinkMui>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onWalletDisconnet(); // disconnect
            setWalletAnchorElement(null);
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );

  const menuMobile = (
    <Hidden implementation="css" smUp>
      {/* <div className={classes.divider}></div> */}
      <IconButton
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
      >
        <MenuIcon />
      </IconButton>
    </Hidden>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static" color="secondary">
        <Toolbar className={classes.toolbar}>
          {menuMobile}
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          <Hidden xsDown>
            <img src="/logos/genie.svg" alt="genie" className={classes.logo} />
          </Hidden>
          <Typography
            variant="h5"
            className={classes.logoText}
            onClick={() => props.history.push('/')}
          >
            genie
          </Typography>
          {menuDesktop}
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        {authAreaDrawer}
      </SwipeableDrawer>
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
    address: state.auth.address,
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
    onWalletConnect: (address) =>
      dispatch({ type: actionTypes.WALLET_CONNECTED, address: address }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
