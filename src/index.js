const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const createError = require('http-errors');
const makeHttpCallback = require('./http-callback');
const CustomerAuthentication = require('./middlewares/customer-authentication');
const {
  taskController,
  userController
} = require('./controllers');

// Getting config details
dotenv.config();

const apiRoot = process.env.API_ROOT;
const app = express();
app.use(bodyParser.json());

// user API routes
app.post(`${apiRoot}/register-user`, makeHttpCallback(userController.registerUserAction));
app.post(`${apiRoot}/login-user`, makeHttpCallback(userController.loginUserAction));
app.post(`${apiRoot}/refresh-jwt-token`, makeHttpCallback(userController.refreshJwtTokenAction));

// task API routesx
app.post(`${apiRoot}/add-task`, CustomerAuthentication.verifyAccessToken, makeHttpCallback(taskController.addTasksAction));
app.get(`${apiRoot}/get-tasks`, CustomerAuthentication.verifyAccessToken, makeHttpCallback(taskController.getTasksAction));
app.delete(`${apiRoot}/:taskId/delete-task`, CustomerAuthentication.verifyAccessToken, makeHttpCallback(taskController.deleteTaskAction));
app.put(`${apiRoot}/:taskId/update-task`, CustomerAuthentication.verifyAccessToken, makeHttpCallback(taskController.updateTaskAction));

// Error handling middleware
app.use((req, res, next) => {
  next(createError.NotFound('Route not found.'));
});

// Starting the server
app.listen(5050, () => {
    console.log('Server is listening on port 5050');
});

module.exports = app;
