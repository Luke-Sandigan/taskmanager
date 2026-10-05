//Created middleware (needed, please check again luke,kenji or everyone)

import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/response.js';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
        ? authHeader.slice(7)
        : null;

    if (!token) {
        return errorResponse(res, 'Authentication required', 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id) {
            return errorResponse(res, 'Invalid token', 401);
        }

        req.user = {
            id: decoded.id,
            role: decoded.role,
        };

        return next();
    } catch {
        return errorResponse(res, 'Invalid or expired token', 401);
    }
};
