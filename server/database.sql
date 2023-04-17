DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS handypersons CASCADE;

CREATE TABLE customers (
  customer_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255)
);

CREATE TABLE handypersons (
  handyperson_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  skill VARCHAR(50) NOT NULL,
  rating DECIMAL(3,2) NOT NULL
);