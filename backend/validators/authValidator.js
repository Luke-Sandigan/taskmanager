import Joi from 'joi';

export const registerSchema = Joi.object({
    username: Joi.string().trim().lowercase().required(),
    password: Joi.string().min(6).max(72, 'utf8').required(),
}).required();

export const loginSchema = Joi.object({
    username: Joi.string().trim().lowercase().required(),
    password: Joi.string().required(),
}).required();