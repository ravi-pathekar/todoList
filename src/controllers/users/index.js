const { registerUser, loginUser, refreshJwtToken } = require('../../use-cases').userUseCase;

const makeRegisterUserAction = require('./register-user');
const registerUserAction = makeRegisterUserAction({
    registerUser,
});

const makeLoginUserAction = require('./login-user');
const loginUserAction = makeLoginUserAction({
    loginUser,
});

const makeRefreshJwtTokenAction = require('./refresh-jwt-token');
const refreshJwtTokenAction = makeRefreshJwtTokenAction({
    refreshJwtToken
})

module.exports = Object.freeze({
    registerUserAction,
    loginUserAction,
    refreshJwtTokenAction
});
