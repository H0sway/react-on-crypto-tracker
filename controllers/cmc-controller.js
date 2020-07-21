// This controller handles the call to the Coin Market Cap API
const axios = require('axios');

const cmcController = {};

cmcController.top = (req,res) => {
  axios({
    method: 'GET',
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=50',
    qs: {
    'start': '1',
    'limit': '50',
    },
    headers: {
      'X-CMC_PRO_API_KEY': process.env.API_KEY,
    },
    json: true,
    gzip: true
  })
  .then(cryptos => {
    res.json({
      message: 'Made an API call',
      data: cryptos.data.data
    });
  })
  .catch(err => {
    console.log('Top 50 CMC API call error', err);
  });
};

cmcController.getAll = (req,res) => {
  axios({
    method: 'GET',
    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    headers: {
      'X-CMC_PRO_API_KEY': process.env.API_KEY,
    },
    json: true,
    gzip: true
  })
  .then(cryptos => {
    res.json({
      message: 'Made an API call',
      data: cryptos.data.data
    });
  })
  .catch(err => {
    console.log('Top 50 CMC API call error', err);
  });
};

cmcController.tracker = (req,res) => {
  axios({
    method: 'GET',
    url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${req.body.currency_id}`,
    headers: {
      'X-CMC_PRO_API_KEY': process.env.API_KEY,
    },
    json: true,
    gzip: true
  })
  .then(cryptos => {
    res.json({
      message: 'Made an API call',
      data: cryptos.data.data
    });
  })
  .catch(err => {
    console.log('Single CMC call error', err);
  });
};


module.exports = cmcController;
