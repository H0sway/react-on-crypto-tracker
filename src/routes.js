import React from 'react';
import { Route, Router } from 'react-router-dom';

import { Grid } from 'react-bootstrap';

import App from './App';
import Home from './components/Home';
import TrackerWrapper from './components/TrackerWrapper';
import TrackerAdd from './components/TrackerAdd';
import TrackerEdit from './components/TrackerEdit';
import About from './components/About';
import Callback from './components/Callback';
import Auth from './auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div>
        <Grid>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/tracker" render={(props) => <TrackerWrapper auth={auth} {...props} />} />
          <Route path="/add" render={(props) => <TrackerAdd auth={auth} {...props} />} />
          <Route path="/edit/:id" render={(props) => <TrackerEdit auth={auth} {...props} />} />
          <Route path="/about" render={(props) => <About auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }}/>
        </Grid>
      </div>
    </Router>
  );
}
