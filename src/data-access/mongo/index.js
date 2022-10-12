const {
    getUserModel,
    getTaskModel
} = require('../models');

const makeUserDb = require('./user-db');
const userDb = makeUserDb({ getUserModel });

const makeTaskdb = require('./task-db');
const taskDb = makeTaskdb({ getTaskModel });

module.exports = Object.freeze({
    userDb,
    taskDb
});
