const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Email must be a valid email address.',
    }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required.',
  }),
});

module.exports = loginSchema;
