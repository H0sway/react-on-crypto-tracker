import React from 'react';
import { Table, Glyphicon } from 'react-bootstrap';

const HomeTable = (props) => {
  const renderTableBody =
    props.currencies.map(currency => {
      const priceUsd = parseFloat(currency.price_usd).toFixed(2);
      const priceBtc = parseFloat(currency.price_btc).toFixed(8);
      const marketCap = parseFloat(currency.market_cap_usd).toFixed(0);
      return (
        <tbody key={currency.rank}>
          <tr>
            <th>#{currency.rank}</th>
            <th>{currency.name}</th>
            <th>${priceUsd}</th>
            <th><Glyphicon glyph="bitcoin" />{priceBtc}</th>
            <th>${marketCap}</th>
            <th>{currency.percent_change_7d}%</th>
          </tr>
        </tbody>
        )
    })
    return (
      <Table bordered condensed responsive >
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
        {renderTableBody}
      </Table>
      )
  }

export default HomeTable
