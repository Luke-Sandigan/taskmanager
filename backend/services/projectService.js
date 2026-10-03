import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const createProject = async (data, userId) => {
    return await Project.create({
        name: data.name,
        description: data.description ?? '',
        createdBy: userId,
    });
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