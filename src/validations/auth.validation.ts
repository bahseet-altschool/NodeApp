import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required().messages({
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email address',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 8 characters long',
  }),
});

export const registerSchema = Joi.object({
  name: Joi.string().lowercase().required(),
  email: Joi.string().lowercase().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'user').optional().messages({
    'any.only': 'Role must be either admin or user',
    'string.empty': 'Role cannot be empty if provided',
  })
});
