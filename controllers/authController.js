// Import the service functions to handle business logic
const { registerUser, loginUser, refreshAccessToken } = require('../services/authServices');

// Controller for user registration
// Calls the service function registerUser and handles the response or error.
const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Attempt to register the user by calling the service function
        const newUser = await registerUser(firstName, lastName, email, password);
        
        // If successful, send a success response with the user data
        res.status(201).json({
            message: 'Registration successful....!',
            user: newUser // Include the created user in the response
        });
    } catch (error) {
        // If an error occurs, send a failure response with the error message
        res.status(400).json({ message: error.message });
    }
};

// Controller for user login
// Calls the service function loginUser to authenticate the user and handle tokens.
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Attempt to log the user in by calling the service function
        const { accessToken, refreshToken, existingUser } = await loginUser(email, password);

        // Optionally, store the refresh token in a cookie (set httpOnly and secure flags for security)
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

        // If login is successful, send the access token and user info in the response
        res.status(200).json({
            message: 'Login successful...!',
            accessToken, // Include the access token in the response
            user: {
                id: existingUser.id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
            },
        });
    } catch (error) {
        // If an error occurs, send a failure response with the error message
        res.status(400).json({ message: error.message });
    }
};

// Controller to refresh the access token using a valid refresh token
// Verifies and processes the refresh token, and sends a new access token in the response.
const refreshToken = async (req, res) => {
    // Check for the refresh token either in the cookies or request body
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    // If no refresh token is provided, respond with an error message
    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token not provided' });
    }

    try {
        // Attempt to refresh the access token using the service function
        const { accessToken, newRefreshToken } = await refreshAccessToken(refreshToken);

        // Optionally, store the new refresh token in a cookie or database for future use
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true });

        // If successful, send the new access token in the response
        res.status(200).json({
            message: 'Token refreshed successfully....',
            accessToken, // Send the new access token
        });
    } catch (error) {
        // If an error occurs, send a failure response with the error message
        res.status(500).json({ message: error.message });
    }
};

// Export the controller functions to be used in the routes
module.exports = { register, login, refreshToken };
