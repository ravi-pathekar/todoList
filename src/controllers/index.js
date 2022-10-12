const taskController = require('./tasks');
const userController = require('./users');

const controller = Object.freeze({
    taskController,
    userController
});

module.exports = controller;
