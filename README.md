
# Node.js Express Login and Registration Example

This project is a simple example of how to implement user authentication and registration using Node.js and Express.js framework, along with JSON Web Tokens (JWT). It also demonstrates how to interact with a MySQL database for storing user credentials.

## Features

- User registration with encrypted password storage.
- User authentication using JWT.
- Secure session management with cookie-session middleware.
- Integration with MySQL database using Sequelize ORM.

## Prerequisites

Before running this application, make sure you have the following installed on your machine:

- Node.js (https://nodejs.org)
- MySQL (https://www.mysql.com)

## Installation

1. Clone this repository to your local machine:

```
git clone https://github.com/tthungdev/NodeJS-Express-Login-and-Registration-with-JWT.git
```

2. Navigate to the project directory:

```
cd node-js-express-login-example
```

3. Install dependencies:

```
npm install
```

4. Set up MySQL database:
   - Create a new database.
   - Update the database configuration in `config/db.config.js` file.

5. Run the application:

```
npm start
```

6. Access the application in your web browser at `http://localhost:3000`.

## Usage

- Register a new user account by visiting `/register` route.
- Log in with the registered account at `/login` route.
- Access protected routes, such as `/profile`, by providing the JWT token received upon successful login.

## Dependencies

- bcryptjs: ^2.4.3
- cookie-session: ^2.0.0
- cors: ^2.8.5
- express: ^4.18.2
- jsonwebtoken: ^9.0.0
- mysql2: ^2.3.3
- sequelize: ^6.31.1
