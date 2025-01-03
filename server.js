// Load environment variables from the .env file using dotenv package
// This ensures that any sensitive data or configurations, like database URLs or JWT secrets, are securely loaded into process.env
require('dotenv').config({ path: `${process.cwd()}/.env` });

// Import necessary packages
const express = require('express');

// Import routes for authentication
const authRouter = require('./routes/authRoute');

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests
// This ensures that the request body is properly parsed into a JavaScript object for further use in route handlers
app.use(express.json());

// Register application routes and middlewares
// This route handles authentication related requests, such as register, login, and refresh token
app.use('/api/auth', authRouter);

// Define the port the server will listen to, either from the environment variable or fallback to 4000
const PORT = process.env.APP_PORT || 4000;

// Start the server and log a message to confirm it is running
// This will listen on the specified PORT and log the message once the server is ready
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
