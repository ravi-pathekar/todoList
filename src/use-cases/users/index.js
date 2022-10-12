const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const Joi = require('joi');
const { userDb } = require('../../data-access/mongo');
const { verifyRefreshToken, signAccessToken, signRefreshToken } = require('../../shared/token');

const makeRegisterUser = require('./register-user');
const registerUser = makeRegisterUser({
    userDb,
    Joi,
    createError,
});

const makeLoginUser = require('./login-user');
const loginUser = makeLoginUser({
    userDb,
    jwt,
    Joi,
    createError,
    signAccessToken,
    signRefreshToken,
});

const makeRefreshJwtToken = require('./refresh-jwt-token');
const refreshJwtToken = makeRefreshJwtToken({
    createError,
    verifyRefreshToken,
    signAccessToken,
    signRefreshToken,
})

module.exports = Object.freeze({
    registerUser,
    loginUser,
    refreshJwtToken,  
});
