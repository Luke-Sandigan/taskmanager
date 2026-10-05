import { Router } from 'express';

import {
    createProject,
    getProjects,
} from '../controllers/projectController.js';

import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken);

router.post('/', createProject);
router.get('/', getProjects);

export default router;