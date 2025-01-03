const Joi = require('joi');

/**
 * Core validation function to validate data against a Joi schema.
 * @param {Object} data - The data to validate.
 * @param {Joi.ObjectSchema} schema - The Joi schema to validate against.
 * @returns {Object} - An object with either `value` (validated data) or `error` (validation errors).
 */
const validate = (data, schema) => {
  return schema.validate(data, { abortEarly: false });
};

module.exports = validate;
