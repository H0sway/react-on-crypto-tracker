import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

           <Route exact path="/" component={Home} />

          <Footer />
        </div>
      </Router>
    );
  }
}
