import { registerUser, authenticateUser } from '../services/authService.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';
import { successResponse, errorResponse } from '../utils/response.js';

const handleError = (res, err) => {
    if (err.status) return errorResponse(res, err.message, err.status);
    console.error(err);
    return errorResponse(res, 'Internal server error', 500);
};

export const register = async (req, res) => {
    const { value, error } = registerSchema.validate(req.body);
    if (error) return errorResponse(res, error.details[0].message, 400);

    try {
        const user = await registerUser(value.username, value.password);
        return successResponse(res, user, 'User registered', 201);
    } catch (err) {
        return handleError(res, err);
    }
};

export const login = async (req, res) => {
    const { value, error } = loginSchema.validate(req.body);
    if (error) return errorResponse(res, error.details[0].message, 400);

    try {
        const token = await authenticateUser(value.username, value.password);
        return successResponse(res, { token }, 'Login successful');
    } catch (err) {
        return handleError(res, err);
    }
};