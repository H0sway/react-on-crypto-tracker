DROP TABLE IF EXISTS currencies;

CREATE TABLE IF NOT EXISTS currencies (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  currency_id VARCHAR NOT NULL,
  investment INT
);
