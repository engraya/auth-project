const Joi = require('joi');

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().messages({
    'string.empty': 'First name is required.',
    'string.min': 'First name must be at least 2 characters long.',
    'string.max': 'First name cannot exceed 30 characters.',
  }),
  lastName: Joi.string().min(2).max(30).required().messages({
    'string.empty': 'Last name is required.',
    'string.min': 'Last name must be at least 2 characters long.',
    'string.max': 'Last name cannot exceed 30 characters.',
  }),
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Email must be a valid email address.',
    }),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.pattern.base':
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
});

module.exports = registerSchema;
