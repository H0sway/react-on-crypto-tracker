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
    console.log(this.props.currency.currency_id);
    axios({
      method: 'POST',
      url: `/api/currencydata/${this.props.currency.currency_id}`,
      data: {
        currency_id: this.props.currency.currency_id,
      }
    })
    .then(data => {
      console.log(data);
      this.setState({
        dataLoaded: true,
        currency: data.data.data[0],
      })
      console.log(this.state.currency);
    })
    .catch(err => {
      console.log('TrackerTable error', err);
    })
  }
  renderTableBody() {
    if (this.state.dataLoaded) {
      const priceUsd = parseFloat(this.state.currency.price_usd).toFixed(2);
      const priceBtc = parseFloat(this.state.currency.price_btc).toFixed(8);
      const marketCap = parseFloat(this.state.currency.market_cap_usd).toFixed(0);
      const investValue = priceUsd * this.props.currency.investment;
      return (
        <ListGroup>
          <ListGroupItem><strong>Name:</strong> {this.state.currency.name} </ListGroupItem>
          <ListGroupItem><strong>Value (USD):</strong> ${priceUsd} </ListGroupItem>
          <ListGroupItem><strong>Value (BTC):</strong> <Glyphicon glyph="bitcoin" />{priceBtc} </ListGroupItem>
          <ListGroupItem><strong>Market Cap:</strong> ${marketCap} </ListGroupItem>
          <ListGroupItem><strong>Percent Change (7 Days):</strong> {this.state.currency.percent_change_7d}% </ListGroupItem>
          <ListGroupItem><strong>Investment Amount:</strong> {this.props.currency.investment} </ListGroupItem>
          <ListGroupItem><strong>Investment Value:</strong> ${investValue.toFixed(2)} </ListGroupItem>
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
