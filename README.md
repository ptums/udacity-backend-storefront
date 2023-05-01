# Udacity Storefront Backend Project

This is a backend application built with Node.js, Express, and PostgreSQL that provides an API for a storefront application. The application uses JSON Web Tokens (JWT) for authentication and authorization, and includes several features such as user registration and authentication, product management, order creation and management, and role-based access control.

## Getting Started

To get started with this application, you'll need to have Node.js and PostgreSQL installed on your machine.

### Installing Dependencies

To install the application dependencies, run the following command:

```
npm install
```

### Setting Up the Database

Before you can start the application, you'll need to set up the database. To do this, follow these steps:

- Create a PostgreSQL database for the application.
- Create a .env file in the project root directory with the following contents:

```
POSTGRES_HOST=<your_database_host>
POSTGRES_DB=<your_database_name>
POSTGRES_TEST_DB=<your_database_test_name>
POSTGRES_USER=<your_database_db_user>
POSTGRES_PASSWORD=<your_database_password>
ENV="dev"
BCRYPT_PASSWORD=<your_bcrypt_password>
TOKEN_SECRET=<your_token_secret>
SALT_ROUNDS=10
```

Replace the placeholders with the appropriate values for your database and JWT secret.

To set up your `POSTGRES_TEST_DB` and `POSTGRES_DB` do the following:

```
psql postgres
CREATE USER shopping_user WITH PASSWORD <password-of-your-choosing>;
CREATE DATABASE shopping;
CREATE DATABASE shopping_test;
GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;
```

This command will create the necessary database tables and insert some sample data.

### Starting the Application

To start the application, run the following command:

```
npm start
```

The application will be available at http://localhost:3000.

## Testing

To run the tests for the application, run the following command:

```
npm test
```

This will run the tests in the tests directory of the project.
