const createError = require('http-errors');
const {
    addTasks,
    getTasks,
    deleteTask,
    updateTask
} = require('../../use-cases').taskUseCase;

const makeAddTasksAction = require('./add-tasks');
const addTasksAction = makeAddTasksAction({
    addTasks,
});

const makeGetTasksAction = require('./get-tasks');
const getTasksAction = makeGetTasksAction({
    getTasks,
    createError
});

const makeDeleteTaskAction = require('./delete-tasks');
const deleteTaskAction = makeDeleteTaskAction({
    deleteTask,
});

const makeUpdateTaskAction = require('./update-tasks');
const updateTaskAction = makeUpdateTaskAction({
    updateTask,
});

module.exports = Object.freeze({
  addTasksAction,
  getTasksAction,
  deleteTaskAction,
  updateTaskAction
});
