# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `'/products' [GET]`
- Show `'/products/:id' [GET]`
- Create [token required] `'/products/create' [POST]`

#### Users

- Index [token required] `'/users' [GET]`
- Show [token required] `'/users/:id' [GET]`
- Create N[token required] `'/users/create' [POST]`

#### Orders

- Current Order by user (args: user id)[token required] `'/orders/:userId' [POST]`

## Data Shapes

Users:
CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(50) NOT NULL,
firstname VARCHAR(50) NOT NULL,
lastname VARCHAR(50) NOT NULL,
password VARCHAR(250) NOT NULL
);

Orders:
CREATE TABLE orders (
id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL REFERENCES users (id),
status BOOLEAN NOT NULL
);

Products:
CREATE TABLE products (
id SERIAL PRIMARY KEY,
name VARCHAR(150) NOT NULL,
price INTEGER NOT NULL
);

Order_products:
CREATE TABLE order_products (
order_id INTEGER NOT NULL REFERENCES orders (id),
product_id INTEGER NOT NULL REFERENCES products (id),
quantity INTEGER NOT NULL
);
