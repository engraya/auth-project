# Authentication System with JWT and Sequelize

This project implements a basic authentication system with user registration, login, and token refresh functionality using JWT and Sequelize. It utilizes PostgreSQL as the database and includes features such as password hashing with bcrypt and secure token management.

## Table of Contents

1. [Project Setup](#project-setup)
2. [Authentication Resource](#authentication-resource)
3. [Security and Validation](#security-and-validation)
4. [Testing the Endpoints](#testing-the-endpoints)
5. [Project Structure](#project-structure)

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

5. Add some entries to the database by running the seed script.

```bash
node seed.js
```

6. Start the server.

```bash
node index.js
```

7. Visit `http://localhost:3000` in your browser to see the list of authors and books. Or use curl to access the api from the terminal.

```bash
# Get a list of authors
curl http://localhost:3000/authors

# Get books by author with id 1
curl http://localhost:3000/books/1
```
