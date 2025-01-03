// Import the controller functions for handling authentication routes
const { register, login, refreshToken } = require('../controllers/authController');

// Create a new instance of Express Router
const router = require('express').Router();

// Route for registering a new user
// POST /register: This route handles user registration. 
// It expects a request body with the user's details, validates the input, hashes the password, and creates the user in the database.
router.route('/register').post(register);

// Route for logging in an existing user
// POST /login: This route handles user login. 
// It expects the user's email and password, verifies the credentials, and generates a JWT access token and refresh token upon successful login.
router.route('/login').post(login);

// Route for refreshing the access token using a valid refresh token
// POST /refresh-token: This route allows the user to obtain a new access token using a refresh token.
// The refresh token is validated, and a new access token is issued. This is useful when the access token expires.
router.route('/refresh-token').post(refreshToken);

// Export the router so it can be used in the main app.js or server.js
module.exports = router;
