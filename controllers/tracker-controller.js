const Currency = require('models/currency');
const axios = require('axios');

const trackerController = {};

trackerController.tracker = (req,res) => {
  Currency.findAll(req.user.id)
  .then(currencies => {
    res.json({
      message: 'Individual tracker data',
      currencies: currencies,
    });
  })
  .catch(err => {
    console.log('tracker error', err);
  });
};

trackerController.single = (req,res) => {
  Currency.findById(req.params.id)
  .then(currency => {
    res.json({
      message: 'single currency',
      currency: currency
    });
  })
  .catch(err => {
    console.log('single currency error', err);
  });
};

trackerController.update = (req,res) => {
  Currency.update({
    id: req.body.id,
    investment: req.body.investment
  })
  .then(currency => {
    res.json({
      message: 'succesful update',
      currency: currency
    });
  })
  .catch(err => {
    console.log('update error', err);
  });
};

trackerController.add = (req,res) => {
  Currency.new({
    user_id: req.body.user_id,
    currency_id: req.body.currency_id,
    investment: req.body.investment
  })
  .then(currency => {
    res.json({
      message: 'created a crypto',
      currency: currency
    });
  })
  .catch(err => {
    console.log('Add new currency error', err);
  });
};

trackerController.delete = (req,res) => {
  Currency.destroy(req.params.id)
  .then(currency => {
    res.json({
      message: 'Successfully removed',
      currency: currency
    });
  })
  .catch(err => {
    console.log('delete error', err);
  });
};

module.exports = trackerController;
