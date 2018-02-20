import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>Hi Mom!</h1>
        </div>
      </Router>
    );
  }
}
