import React, { Component } from 'react';
import axios from 'axios';

import HomeTable from './HomeTable';

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      dataLoaded: false,
      currencies: [],
    }
   }
  componentDidMount() {
    axios({
      method: 'GET',
      url: '/api/currencydata',
    })
    .then(currencies => {
      this.setState({
        dataLoaded: true,
        currencies: currencies.data.data,
       });
    })
    .catch(err => {
      console.log('component did mount error');
    })
  }
  render() {
    return (
      <div className="Home">
        <HomeTable currencies ={this.state.currencies} />
      </div>
    );
  }
}
