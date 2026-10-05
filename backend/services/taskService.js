import mongoose from 'mongoose';
import Task from '../models/Task.js';
import Project from '../models/Project.js';


//task service#3 updates ids
const createError = (message, status) => {
    const err = new Error(message);
    err.status = status;
    return err;
};

const validateTaskId = (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw createError('Invalid task ID', 400);
    }
};

export const createTask = async (data, userId) => {
    if (data.projectId) {
        const project = await Project.findOne({
            _id: data.projectId,
            createdBy: userId,
        });

        if (!project) {
            throw createError('Project not found', 404);
        }
    }

    return await Task.create({
        title: data.title,
        description: data.description ?? '',
        projectId: data.projectId,
        createdBy: userId,
    });
};

export const getTasks = async (userId) => {
    return await Task.find({ createdBy: userId })
        .sort({ createdAt: -1 });
};

export const updateTask = async (id, data, userId) => {
    validateTaskId(id);

    const task = await Task.findOneAndUpdate(
        { _id: id, createdBy: userId },
        { $set: data },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!task) {
        throw createError('Task not found', 404);
    }

    return task;
};

export const deleteTask = async (id, userId) => {
    validateTaskId(id);

    const task = await Task.findOneAndDelete({
        _id: id,
        createdBy: userId,
    });

    if (!task) {
        throw createError('Task not found', 404);
    }

    return task;
}; //task service#4 delete filter for the ids
