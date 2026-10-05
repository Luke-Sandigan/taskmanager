import mongoose from 'mongoose';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

const createError = (message, status) => {
    const err = new Error(message);
    err.status = status;
    return err;
};

const validateProjectId = (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw createError('Invalid project ID', 400);
    }
};

const projectWithTasks = async (project, userId) => {
    const tasks = await Task.find({
        createdBy: userId,
        projectId: project._id,
    }).sort({ createdAt: -1 });

    return {
        ...project.toObject({ virtuals: true }),
        tasks,
    };
};

export const createProject = async (data, userId) => {
    const project = await Project.create({
        name: data.name,
        description: data.description ?? '',
        createdBy: userId,
    });

    return projectWithTasks(project, userId);
};

export const getProjectsWithTasks = async (userId) => {
    const projects = await Project.find({ createdBy: userId })
        .sort({ createdAt: -1 });

    if (projects.length === 0) {
        return [];
    }

    const tasks = await Task.find({
        createdBy: userId,
        projectId: { $in: projects.map((project) => project._id) },
    }).sort({ createdAt: -1 });

    const tasksByProject = new Map();
    for (const task of tasks) {
        const projectId = task.projectId.toString();
        const projectTasks = tasksByProject.get(projectId) ?? [];
        projectTasks.push(task);
        tasksByProject.set(projectId, projectTasks);
    }

    return projects.map((project) => ({
        ...project.toObject({ virtuals: true }),
        tasks: tasksByProject.get(project._id.toString()) ?? [],
    }));
};

export const updateProject = async (id, data, userId) => {
    validateProjectId(id);

    const project = await Project.findOneAndUpdate(
        { _id: id, createdBy: userId },
        { $set: data },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!project) {
        throw createError('Project not found', 404);
    }

    return projectWithTasks(project, userId);
};

export const deleteProject = async (id, userId) => {
    validateProjectId(id);

    const project = await Project.findOneAndDelete({
        _id: id,
        createdBy: userId,
    });

    if (!project) {
        throw createError('Project not found', 404);
    }

    return projectWithTasks(project, userId);
};