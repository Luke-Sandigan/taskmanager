import Joi from 'joi';

export const createProjectSchema = Joi.object({
    name: Joi.string().trim().min(1).max(200).required(),
    description: Joi.string().trim().max(5000).allow('').default(''),
}).required();

export const updateProjectSchema = Joi.object({
    name: Joi.string().trim().min(1).max(200),
    description: Joi.string().trim().max(5000).allow(''),
})
    .min(1)
    .required();