'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const user = sequelize.define(
  'user', // Keep the model name in singular form
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'firstName cannot be null' },
        notEmpty: { msg: 'firstName cannot be empty' },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'lastName cannot be null' },
        notEmpty: { msg: 'lastName cannot be empty' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'email cannot be null' },
        notEmpty: { msg: 'email cannot be empty' },
        isEmail: { msg: 'Invalid email address' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'password cannot be null' },
        notEmpty: { msg: 'password cannot be empty' },
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
    tableName: 'users', // Explicitly specify the table name
  }
);

module.exports = user;
