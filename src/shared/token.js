const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
    signAccessToken: (userId) => {
        return new Promise ((resolve, reject) => {
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: "1h",
                audience: userId.toString(),
            };
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject();
                }
                resolve(token);
            });
        });
    },

    signRefreshToken: (userId) => {
        return new Promise ((resolve, reject) => {
            const payload = {};
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: "1d",
                audience: userId.toString(),
            };
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject();
                }
                resolve(token);
            });
        });
    },

    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
          jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, payload) => {
              if (err) return reject(createError.Unauthorized());
              const userId = payload.aud;
              resolve(userId);
            }
          );
        });
      },
};
