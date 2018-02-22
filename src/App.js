import React, { Component } from 'react';
import {BrowserRouter as Router, Route, browserHistory} from 'react-router-dom';

// Require auth for the /tracker route
import { requireAuth } from './utils/AuthService';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Tracker from './components/Tracker';
import Callback from './components/Callback';

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <div className="App">
          <Header />

          <Route exact path="/" component={Home} />
          <Route exact path="/tracker" component={Tracker} onEnter={requireAuth} />
          <Route exact path="/callback" component={Callback} />

          <Footer />
        </div>
      </Router>
    );
  }
}
