import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Glyphicon } from 'react-bootstrap';
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
      const investValue = parseFloat(this.state.currency.value_usd) * this.props.currency.investment
      return (
        <ListGroup>
          <ListGroupItem>Name: {this.state.currency.name} </ListGroupItem>
          <ListGroupItem>Value (USD): ${parseFloat(this.state.currency.value_usd).toFixed(2)} </ListGroupItem>
          <ListGroupItem>Value (BTC): <Glyphicon glyph="bitcoin" />{parseFloat(this.state.currency.value_btc).toFixed(8)} </ListGroupItem>
          <ListGroupItem>Market Cap: ${parseFloat(this.state.currency.market_cap_usd).toFixed(0)} </ListGroupItem>
          <ListGroupItem>Percent Change (7 Days): {this.state.currency.percent_change_7d}% </ListGroupItem>
          <ListGroupItem>Investment Amount: {this.props.currency.investment} </ListGroupItem>
          <ListGroupItem>Investment Value: {investValue.toFixed(2)} </ListGroupItem>
        </ListGroup>
      )
    }
  }
  render() {
    return (
      <div className="Tracker-Table">
        {this.renderTableBody()}
      </div>
    );
  }
}
