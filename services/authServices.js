// /services/authService.js
const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registerSchema = require('../utils/registerValidation');
const loginSchema = require('../utils/loginValidation');
const validate = require('../utils/validate');

const generateTokens = (user) => {
    const accessToken = jwt.sign({ _id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({ _id: user.id }, process.env.JWT_REFRESH_SECRET_KEY, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
};

const registerUser = async (firstName, lastName, email, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { error } = validate({ firstName, lastName, email, password }, registerSchema);
    if (error) {
        throw new Error(error.details.map((detail) => detail.message).join(", "));
    }

    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    try {
        const newUser = await user.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        return newUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

const loginUser = async (email, password) => {
    const { error } = validate({ email, password }, loginSchema);
    if (error) {
        throw new Error(error.details.map((detail) => detail.message).join(", "));
    }

    const existingUser = await user.findOne({ where: { email } });
    if (!existingUser) {
        throw new Error('User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        throw new Error('Invalid password');
    }

    const { accessToken, refreshToken } = generateTokens(existingUser);

    return { accessToken, refreshToken, existingUser };
};

const refreshAccessToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, async (err, decoded) => {
            if (err) {
                return reject(new Error('Invalid refresh token'));
            }

            const authUser = await user.findByPk(decoded._id);
            if (!authUser) {
                return reject(new Error('User not found'));
            }

            const { accessToken, refreshToken: newRefreshToken } = generateTokens(authUser);

            return resolve({ accessToken, newRefreshToken });
        });
    });
};

module.exports = { registerUser, loginUser, refreshAccessToken };
