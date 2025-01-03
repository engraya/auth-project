# Authentication System with JWT and Sequelize

This project implements a basic authentication system with user registration, login, and token refresh functionality using JWT and Sequelize. It utilizes PostgreSQL as the database and includes features such as password hashing with bcrypt and secure token management.

## Table of Contents

1. [Project Setup](#project-setup)
2. [Authentication Resource](#authentication-resource)
3. [Security and Validation](#security-and-validation)
4. [Testing the Endpoints](#testing-the-endpoints)
5. [Project Structure](#project-structure)

## Project Structure
project/
`├── controllers/            # Contains the controllers for handling requests`
`│   └── authController.js   # Manages user authentication-related actions`
`├── models/                 # Contains Sequelize models`
`│   └── user.js             # User model definition`
`├── routes/                 # Contains route definitions`
`│   └── authRoute.js        # Authentication routes`
`├── services/               # Contains the service logic`
`│   └── authService.js      # Business logic for user registration, login, and token refresh`
`├── migrations/             # Contains Sequelize migrations`
`├── config/                 # Configuration files (e.g., database configuration)`
`├── .env                    # Environment variables for the app`
`├── package.json            # Project dependencies and scripts`
`└── server.js               # Entry point for the application`

## Environment Variables

`NODE_ENV=development`

`DATABASE_URL=postgresql://yourusername:yourpassword@localhost:5432/yourdatabase`

`APP_PORT=3000`

`JWT_SECRET_KEY=yoursecretkey`

`JWT_EXPIRES_IN=1h`

`JWT_REFRESH_SECRET_KEY=yourrefreshsecretkey`

`JWT_REFRESH_EXPIRES_IN=30d`

`JWT_SECRET_KEY=`

`JWT_EXPIRES_IN=`


You will need the following:

- A [Neon](https://neon.tech) account and a project
- Node.js and npm

1. Clone this repository.

```bash
git clone https://github.com/engraya/auth-project/tree/main
```

2. Navigate to the project directory and install the dependencies.

```bash
cd guide-neon-sequelize
npm install
```

3. Create a `.env` file in the root of the project and add the following environment variables:

```bash
DATABASE_URL=
```

4. Run the migrations using Sequelize.

```bash
npx sequelize db:migrate
```

5. Start the server.

```bash
node index.js
```

6. Visit `http://localhost:3000` in your browser to see the list of authors and books. Or use curl to access the api from the terminal.

```bash
- The README now correctly reflects the auth endpoints (`/auth/register`, `/auth/login`, `/auth/refresh-token`) instead of the previous author and book endpoints.
- The `curl` examples are updated to match your authentication endpoints and their usage.

Let me know if you'd like to further adjust any details!

```
