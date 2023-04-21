DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS handypersons CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS orders CASCADE;


CREATE TABLE customers (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL
);

CREATE TABLE skills (
  id SERIAL PRIMARY KEY NOT NULL,
  skill_name VARCHAR(50) NOT NULL,
  price DECIMAL(8,2) NOT NULL
);

CREATE TABLE handypersons (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0.0 NOT NULL,
  skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE
);


CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  description VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  status VARCHAR(50) NOT NULL,
  handyperson_id INTEGER REFERENCES handypersons(id) ON DELETE CASCADE,
  task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE
);

INSERT INTO customers (id, first_name, last_name, email, phone_number, username, password, address)
VALUES (1, 'nima', 'mo', 'nima@gmail.com', '60488855522', 'nemo', '123', '406 Citadel');

INSERT INTO handypersons (id, first_name, last_name, email, phone_number, username, password, address, skill_id)
VALUES (1,'Jack', 'mp', 'jack@gmail.com', '6047778594', 'Jacki', '123', '555 skylin', 1);

INSERT INTO skills (id, skill_name, price )
VALUES (1, 'painter', '85');

INSERT INTO tasks (id, description, address, create_time, customer_id, skill_id)
VALUES (1, 'hello painter', '888 citadel', NOW(), 1, 1);

INSERT INTO orders (id,status, handyperson_id, task_id )
VALUES (1, 'pending', 1, 1);