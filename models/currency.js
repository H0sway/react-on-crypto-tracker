const db = require('../db/config');
const Currency = {};

Currency.findAll = (user_id) => {
  return db.query(`
    SELECT * FROM currencies
    WHERE user_id = $1
    `,[user_id]);
};

Currency.findById = (id) => {
  return db.oneOrNone(`
    SELECT * FROM currencies
    WHERE id = $1
    `,[id]);
};

Currency.create = (currency) => {
  return db.one(`
    INSERT INTO currencies (user_id, currency_id, investment)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [currency.user_id, currency.currency_id, currency.investment]);
};

Currency.update = (currency, id) => {
  return db.none(`
    UPDATE currencies
    SET investment = $1
    WHERE id = $2
    `, [currency.investment, currency.id]);
};

Currency.destroy = (id) => {
  return db.none(`
    DELETE FROM currencies WHERE id = $1
    `,[id]);
};

module.exports = Currency;
