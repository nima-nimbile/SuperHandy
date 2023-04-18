DROP TABLE IF EXISTS order_assignment CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
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
  phone_number VARCHAR(20) NOT NULL,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  skill INTEGER NOT NULL,
  rating DECIMAL(3,2) NOT NULL
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER NOT NULL,
  order_type_id INTEGER NOT NULL,
  description_inquiry TEXT NOT NULL,
  comment TEXT,
  address VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  create_datetime TIMESTAMP DEFAULT NOW()
);
CREATE TABLE order_assignment (
  assignment_id SERIAL PRIMARY KEY NOT NULL,
  handyperson_id INTEGER NOT NULL,
  order_id INTEGER NOT NULL,
  status VARCHAR(20) NOT NULL
);

CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY NOT NULL,
  handyperson_id INTEGER NOT NULL,
  price DECIMAL(6,2) NOT NULL,
  category_name VARCHAR(50) NOT NULL
);