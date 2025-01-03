// Import necessary modules
const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerSchema = require('../utils/registerValidation');
const loginSchema = require('../utils/loginValidation');
const validate = require('../utils/validate');

// Function to generate access and refresh tokens
// Takes the user object as input, signs JWT tokens with the user ID and appropriate secret keys
// Returns both access and refresh tokens
const generateTokens = (user) => {
    // Generate access token (expires in the time defined in JWT_EXPIRES_IN)
    const accessToken = jwt.sign({ _id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN, // Token expiration set in environment variables
    });

    // Generate refresh token (expires in the time defined in JWT_REFRESH_EXPIRES_IN)
    const refreshToken = jwt.sign({ _id: user.id }, process.env.JWT_REFRESH_SECRET_KEY, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN, // Token expiration set in environment variables
    });

    // Return both tokens
    return { accessToken, refreshToken };
};

// Register a new user
// Hashes the password, validates input with Joi, checks if the user already exists, 
// then creates and returns the new user.
const registerUser = async (firstName, lastName, email, password) => {
    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Validate input data against the registration schema
    const { error } = validate({ firstName, lastName, email, password }, registerSchema);
    if (error) {
        // Throw error if validation fails, with details of failed validation
        throw new Error(error.details.map((detail) => detail.message).join(", "));
    }

    // Check if a user with the provided email already exists
    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
        // Throw error if the email is already taken
        throw new Error('User with this email already exists');
    }

    // Try to create a new user in the database
    try {
        const newUser = await user.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        // Return the newly created user
        return newUser;
    } catch (error) {
        // Catch any errors that occur during the user creation process
        throw new Error(error.message);
    }
};

// Login an existing user
// Validates input, compares the password with the hashed password in the database, 
// generates and returns JWT tokens (access and refresh tokens).
const loginUser = async (email, password) => {
    // Validate input data against the login schema
    const { error } = validate({ email, password }, loginSchema);
    if (error) {
        // Throw error if validation fails, with details of failed validation
        throw new Error(error.details.map((detail) => detail.message).join(", "));
    }

    // Find user by email
    const existingUser = await user.findOne({ where: { email } });
    if (!existingUser) {
        // Throw error if no user is found with the provided email
        throw new Error('User not found');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        // Throw error if password doesn't match
        throw new Error('Invalid password');
    }

    // Generate access and refresh tokens for the authenticated user
    const { accessToken, refreshToken } = generateTokens(existingUser);

    // Return both tokens along with the user object
    return { accessToken, refreshToken, existingUser };
};

// Refresh the access token using a valid refresh token
// Verifies the refresh token, checks if the user exists, and generates new tokens.
const refreshAccessToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        // Verify the refresh token using the JWT_REFRESH_SECRET_KEY
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, async (err, decoded) => {
            if (err) {
                // Reject if the refresh token is invalid
                return reject(new Error('Invalid refresh token'));
            }

            // Find the user associated with the refresh token
            const authUser = await user.findByPk(decoded._id);
            if (!authUser) {
                // Reject if the user is not found
                return reject(new Error('User not found'));
            }

            // Generate new access and refresh tokens for the user
            const { accessToken, refreshToken: newRefreshToken } = generateTokens(authUser);

            // Resolve with the new tokens
            return resolve({ accessToken, newRefreshToken });
        });
    });
};

// Export the service functions to be used in controllers
module.exports = { registerUser, loginUser, refreshAccessToken };
