import {
    createTask as createTaskService,
    getTasks as getTasksService,
    updateTask as updateTaskService,
    deleteTask as deleteTaskService,
} from '../services/taskService.js';

import {
    createTaskSchema,
    updateTaskSchema,
} from '../validators/taskValidator.js';

import {
    successResponse,
    errorResponse,
} from '../utils/response.js';

const handleError = (res, err) => {
    if (err.status) {
        return errorResponse(res, err.message, err.status);
    }

    console.error(err);
    return errorResponse(res, 'Internal server error', 500);
};

export const createTask = async (req, res) => {
    const { value, error } = createTaskSchema.validate(req.body);

    if (error) {
        return errorResponse(res, error.details[0].message, 400);
    }

    try {
        const task = await createTaskService(value, req.user.id);

        return successResponse(res, task, 'Task created', 201);
    } catch (err) {
        return handleError(res, err);
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await getTasksService(req.user.id);

        return successResponse(res, tasks, 'Tasks retrieved');
    } catch (err) {
        return handleError(res, err);
    }
};

export const updateTask = async (req, res) => {
    const { value, error } = updateTaskSchema.validate(req.body);

    if (error) {
        return errorResponse(res, error.details[0].message, 400);
    }

    try {
        const task = await updateTaskService(
            req.params.id,
            value,
            req.user.id
        );

        return successResponse(res, task, 'Task updated');
    } catch (err) {
        return handleError(res, err);
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await deleteTaskService(
            req.params.id,
            req.user.id
        );

        return successResponse(res, task, 'Task deleted');
    } catch (err) {
        return handleError(res, err);
    }
}; //task controllers for updating and deleting (Task 5 and 7)
//IM TIRED ASFFFFFFFFF
