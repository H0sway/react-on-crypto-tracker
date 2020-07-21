DROP TABLE IF EXISTS currencies;

CREATE TABLE IF NOT EXISTS currencies (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR NOT NULL,
  currency_name VARCHAR NOT NULL,
  currency_id INT NOT NULL,
  investment INT
);
