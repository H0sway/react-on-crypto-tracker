import React from 'react';
import { Table, Glyphicon } from 'react-bootstrap';

const HomeTable = (props) => {
  const renderTableBody =
    props.currencies.map(currency => {
      const priceUsd = parseFloat(currency.quote.USD.price).toFixed(2);
      const marketCap = parseFloat(currency.quote.USD.market_cap).toFixed(0);
      return (
        <tbody key={currency.rank}>
          <tr>
            <th>#{currency.cmc_rank}</th>
            <th>{currency.name}</th>
            <th>${priceUsd}</th>
            <th>${marketCap}</th>
            <th>{currency.quote.USD.percent_change_7d}%</th>
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
            <th>Market Cap</th>
            <th>Percent Change (7 Days)</th>
          </tr>
        </thead>
        {renderTableBody}
      </Table>
      )
  }

export default HomeTable
