import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

import HomeTable from './HomeTable';

export default class Home extends Component {
  constructor() {
    super();
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
      console.log('component did mount error', err);
    })
  }
  render() {
    return (
      <div className="Home">
        <Row>
          <Col xs={12} md={12}>
            {this.state.dataLoaded ? <HomeTable currencies={this.state.currencies} /> : <p>Loading... This might take a while</p> }
          </Col>
        </Row>
      </div>
    );
  }
}
