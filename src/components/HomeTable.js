import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class HomeTable extends Component {
  constructor(props) {
    super(props);
  }
  renderTableBody() {
    return this.props.currencies.map(currency => {
      return (
        <tbody key={currency.rank}>
          <tr>
            <th>#{currency.rank}</th>
            <th>{currency.name}</th>
            <th>${currency.price_usd}</th>
            <th>{currency.price_btc}</th>
            <th>{currency.market_cap_usd}</th>
            <th>{currency.percent_change_7d}%</th>
          </tr>
        </tbody>
        )
    })
  }
  render() {
    return (
      <Table bordered hover condensed>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Value (USD)</th>
            <th>Value (BTC)</th>
            <th>Market Cap</th>
            <th>Percent Change (7 Days)</th>
          </tr>
        </thead>
        {this.renderTableBody()}
      </Table>
      )
  }
}

export default HomeTable
