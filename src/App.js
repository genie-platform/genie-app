import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Login from './components/Login/Login';

const useStyles = makeStyles((theme) => ({
  app: {
    minHeight: '100vh',
    background: theme.customGradients.primary,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Login />
    </div>
  );
}

export default App;
