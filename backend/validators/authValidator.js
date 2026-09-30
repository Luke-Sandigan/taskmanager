import Joi from 'joi';

export const registerSchema = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().min(6).required(),
});