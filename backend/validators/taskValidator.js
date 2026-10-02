import Joi from 'joi';

export const createTaskSchema = Joi.object({
    title: Joi.string().trim().min(1).max(200).required(),
    description: Joi.string().trim().max(5000).allow('').default(''),
}).required();

export const updateTaskSchema = Joi.object({
    title: Joi.string().trim().min(1).max(200),
    description: Joi.string().trim().max(5000).allow(''),
})
    .min(1)
    .required(); //Please check, JOI validation layer--Makes sure words and task schemas are trimmed and perfectly spaced
