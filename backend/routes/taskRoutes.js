import { Router } from 'express';

import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} from '../controllers/taskController.js';

import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticateToken);

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router; //routes ticket, Task 6 MFER im gonna die
