const { Sequelize } = require('sequelize');
const config = require('./config');

const env = process.env.NODE_ENV || 'development';
const { url, ...options } = config[env];

const sequelize = new Sequelize(url, options);

module.exports = sequelize;
