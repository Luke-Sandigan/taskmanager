import {
    createProject as createProjectService,
    getProjectsWithTasks as getProjectsService,
    updateProject as updateProjectService,
    deleteProject as deleteProjectService,
} from '../services/projectService.js';

import {
    createProjectSchema,
    updateProjectSchema,
} from '../validators/projectValidator.js';

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

export const createProject = async (req, res) => {
    const { value, error } = createProjectSchema.validate(req.body);

    if (error) {
        return errorResponse(res, error.details[0].message, 400);
    }

    try {
        const project = await createProjectService(value, req.user.id);

        return successResponse(res, project, 'Project created', 201);
    } catch (err) {
        return handleError(res, err);
    }
};

export const getProjects = async (req, res) => {
    try {
        const projects = await getProjectsService(req.user.id);

        return successResponse(res, projects, 'Projects retrieved');
    } catch (err) {
        return handleError(res, err);
    }
};

export const updateProject = async (req, res) => {
    const { value, error } = updateProjectSchema.validate(req.body);

    if (error) {
        return errorResponse(res, error.details[0].message, 400);
    }

    try {
        const project = await updateProjectService(
            req.params.id,
            value,
            req.user.id
        );

        return successResponse(res, project, 'Project updated');
    } catch (err) {
        return handleError(res, err);
    }
};

export const deleteProject = async (req, res) => {
    try {
        const project = await deleteProjectService(
            req.params.id,
            req.user.id
        );

        return successResponse(res, project, 'Project deleted');
    } catch (err) {
        return handleError(res, err);
    }
};