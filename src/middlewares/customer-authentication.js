const jwt = require('jsonwebtoken');
const createError = require('http-errors');

class CustomerAuthentication {

    /**
     * @description Validating access token
     * @param {Object} request
     * @param {Object} response
     * @param {Object} next
     */
    static verifyAccessToken (req, res, next) {
        if (!req.headers.authorization) {
            throw createError.Unauthorized('Authorization failed.');
        }
        const accessToken = req.headers.authorization.split(' ')[1];
        if (!accessToken) {
            throw createError.Unauthorized('Authorization failed.');
        }
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
              return next(err);
            }
            req.payload = payload;
            next();
        });
    }
}

module.exports = CustomerAuthentication;
