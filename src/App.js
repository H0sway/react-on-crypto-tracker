import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <h1>Hi Mom!</h1>
          <Footer />
        </div>
      </Router>
    );
  }
}
