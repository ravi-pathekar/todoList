const createError = require('http-errors');


function makeTaskdb({ getTaskModel }) {
    return Object.freeze({
        getAllTasks,
        addTask,
        updateTask,
        deleteTask
    });

    async function getAllTasks(taskId) {
        try {
            const TaskModel = await getTaskModel();
            return await TaskModel.find({}).lean();
        } catch (error) {
            throw error;
        }
    }

    async function addTask(taskData) {
        try {
            const TaskModel = await getTaskModel();
            return await TaskModel.create(taskData);
        } catch (error) {
            throw error;
        }
    }

    async function updateTask({ taskId, isCompleted }) {
        try {
            const TaskModel = await getTaskModel();
            return await TaskModel.findOneAndUpdate({ _id: taskId }, { $set: { isCompleted } }, { new: true }).lean();
        } catch (error) {
            throw error;
        }
    }

    async function deleteTask(taskId) {
        try {
            const TaskModel = await getTaskModel();
            return await TaskModel.findOneAndDelete({ _id: taskId }).lean();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = makeTaskdb;
