import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Glyphicon, Row } from 'react-bootstrap';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';

export default class TrackerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      currency: {},
    }
  }
  componentDidMount() {
    axios({
      method: 'POST',
      url: `/api/currencydata/${this.props.currency.currency_id}`,
      data: {
        currency_id: this.props.currency.currency_id,
      }
    })
    .then(data => {
      console.log(data.data.data[1]);
      this.setState({
        dataLoaded: true,
        currency: data.data.data[1],
      })
      console.log('THIS IS CURRENCY', this.state.currency);
    })
    .catch(err => {
      console.log('TrackerTable error', err);
    })
  }
  renderTableBody() {
    if (this.state.dataLoaded) {
      const priceUsd = parseFloat(this.state.currency.quote.USD.price).toFixed(8);
      const marketCap = parseFloat(this.state.currency.quote.USD.market_cap).toFixed(0);
      const investValue = priceUsd * this.props.currency.investment;
      return (
        <ListGroup>
          <ListGroupItem><strong>Name:</strong> {this.state.currency.name} </ListGroupItem>
          <ListGroupItem><strong>Value (USD):</strong> ${priceUsd} </ListGroupItem>
          <ListGroupItem><strong>Market Cap:</strong> ${marketCap} </ListGroupItem>
          <ListGroupItem><strong>Percent Change (7 Days):</strong> {this.state.currency.percent_change_7d}% </ListGroupItem>
          <ListGroupItem><strong>Investment Amount:</strong> {this.props.currency.investment} </ListGroupItem>
          <ListGroupItem><strong>Investment Value:</strong> ${investValue.toFixed(2)} </ListGroupItem>
          <LinkContainer to={`/edit/${this.props.currency.id}`}><Button bsStyle="warning">Edit</Button></LinkContainer>
        </ListGroup>
      )
    }
  }
  render() {
    return (
      <div className="Tracker-Table" sm={10} md={6}>
        {this.renderTableBody()}
      </div>
    );
  }
}
