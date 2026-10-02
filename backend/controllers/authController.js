import { registerUser, authenticateUser } from '../services/authService.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';

export const register = async (req, res) => {
    const { value, error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const user = await registerUser(value.username, value.password);
        res.status(201).json({ user });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    const { value, error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const token = await authenticateUser(value.username, value.password);
        res.status(200).json({ token });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};