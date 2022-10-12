const Mongo = require('../mongo-connection');
const dbConnection = new Mongo();

const makeUserModel = require('./user.model');
const makeTaskModel = require('./task.model');

const getUserModel = makeUserModel({ dbConnection });
const getTaskModel = makeTaskModel({ dbConnection });

module.exports = {
    getUserModel,
    getTaskModel
};
