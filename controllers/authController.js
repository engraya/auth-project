// /controllers/authController.js
const { registerUser, loginUser, refreshAccessToken } = require('../services/authServices');

const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const newUser = await registerUser(firstName, lastName, email, password);
        
        res.status(201).json({
            message: 'Registration successful....!',
            user: newUser
        });


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { accessToken, refreshToken, existingUser } = await loginUser(email, password);

        // Optionally, store refreshToken in cookie or database
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

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
        res.status(400).json({ message: error.message });
    }
};

const refreshToken = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token not provided' });
    }

    try {
        const { accessToken, newRefreshToken } = await refreshAccessToken(refreshToken);

        // Optionally, store new refreshToken (in cookie or DB)
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true });

        res.status(200).json({
            message: 'Token refreshed successfully....',
            accessToken, // Send the new access token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login, refreshToken };
