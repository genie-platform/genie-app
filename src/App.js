import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';

import PoolCreator from './components/PoolCreator/PoolCreator';
import PoolDashboard from './components/PoolDashboard/PoolDashboard';
import PoolExplorer from './components/PoolExplorer/PoolExplorer';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import { client } from './services/graphql';
import ReactGA from './services/ga';
 
const useStyles = makeStyles((theme) => ({
  app: {
    background: theme.customColors.background,
  },
  content: {
    minHeight: '100vh',
  },
}));

function usePageViews() {
  const location = useLocation();
  useEffect(() => {
    ReactGA.pageview(location.pathname)
  }, [location]);
}

const Routes = (props) => {
  //   const location = useLocation();
  usePageViews();

  // useEffect(() => {
  //   console.log({ location });
  // }, [location]);
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/create-pool" exact component={PoolCreator} />
      <Route path="/explore" exact component={PoolExplorer} />
      <Route
        path="/dashboard/:poolAddress"
        exact
        component={PoolDashboard}
      />
    </Switch>
  )
}
const App = (props) => {
  const classes = useStyles();




  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className={classes.app}>
          <div className={classes.content}>
            <Header />
            <Routes />
            {/* <Switch>

            </Switch> */}
          </div>
          <Footer />
        </div>
      </ApolloProvider>
    </BrowserRouter>
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

export default connect(mapStateToProps, null)(App);
