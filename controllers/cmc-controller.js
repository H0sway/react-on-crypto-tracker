// This controller handles the call to the Coin Market Cap API
const axios = require('axios');

const cmcController = {};

controller.top = (req,res) => {
  axios({
    method: 'GET',
    url: 'https://api.coinmarketcap.com/v1/ticker/?limit=50'
  })
  .then(cryptos => {
    res.json({
      message: 'Made an API call',
      data: cryptos.data
    });
  })
  .then(err => {
    console.log('Top 50 CMC API call error', err);
  });
};

controller.tracker = (req,res) => {
  axios({
    method: 'GET',
    url: `https://api.coinmarketcap.com/v1/ticker/${currency.currency_id}`
  })
  .then(crypto => {
    res.json({
      message: 'Single crypto data loaded',
      data: crypto.data
    });
  })
  .catch(err => {
    console.log('Single CMC call error', err);
  });
};


module.exports = cmcController;
