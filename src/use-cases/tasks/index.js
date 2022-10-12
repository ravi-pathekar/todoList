const createError = require('http-errors');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { taskDb } = require('../../data-access/mongo');

const makeAddTasks = require('./add-tasks');
const addTasks = makeAddTasks({ taskDb, Joi, createError });

const makeGetTasks = require('./get-tasks');
const getTasks = makeGetTasks({ taskDb, Joi, createError });

const makeDeleteTask = require('./delete-tasks');
const deleteTask = makeDeleteTask({ taskDb, Joi, createError });

const makeUpdateTask = require('./update-tasks');
const updateTask = makeUpdateTask({ taskDb, Joi, createError });

module.exports = Object.freeze({
    addTasks,
    getTasks,
    deleteTask,
    updateTask
});
