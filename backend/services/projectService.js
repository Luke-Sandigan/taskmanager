import Project from '../models/Project.js';

export const createProject = async (data, userId) => {
    return await Project.create({
        name: data.name,
        description: data.description ?? '',
        createdBy: userId,
    });
};