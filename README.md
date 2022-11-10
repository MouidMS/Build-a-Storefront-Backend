# Build-a-Storefront-Backend

Project 2: Build a Storefront Backend

## Installation Instructions:

install all packages in this project.
`npm install`

## Set up Database:

when you `npm install` to install all dependencies db-migrate up to set up the database and get access via http://127.0.0.1:3000 npm run start to build the app and running

Also You need the following modules and dependencies installed to run this project:

```bash
docker-compose   # To run the Postgres database on Docker
node 12          # To run the application
yarn             # For dependency management
```

Create a user and the databases with the psql commands:

```
    CREATE USER shopping_user WITH PASSWORD '0000';
    CREATE DATABASE shopping;
    CREATE DATABASE shopping_user_test;
    GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user_test;
    GRANT ALL PRIVILEGES ON DATABASE shopping_user_test TO shopping_user;
```

### Setup environment

create a `.env` form file .env.example with all the required environment variables:

```bash
# .env
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shopping
POSTGRES_TEST_DB=shopping_user_test
POSTGRES_USER=shopping_user
POSTGRES_PASSWORD=password123
ENV=dev

BCRYPT_PASSWORD=hi-there
SALT_ROUNDS=10
TOKEN=udacity-storefront
```

### Running Ports

After start up, the server will start on port `3000` and the database on port `5432`

## Starting

Start app with `npm run start` or `npm run watch`

## Run all the tests

`npm run testEnv`
