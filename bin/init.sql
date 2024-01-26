CREATE TABLE IF NOT EXISTS cupcake (
  id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  description VARCHAR,
  price NUMERIC(12, 2) NOT NULL,
  ingredients VARCHAR[]
);