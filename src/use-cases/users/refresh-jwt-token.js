module.exports = function makeRefreshJwtToken({
    createError,
    verifyRefreshToken,
    signAccessToken,
    signRefreshToken,
}) {

    /**
     * @description refresh user tokens
     * @param {String} refreshToken
     * @returns {Object} access token and refresh token
     */
    return async function refreshJwtToken(refreshToken) {
        try {
            let token = refreshToken;
            if (!token) {
                throw createError.BadRequest();
            }
            const userId = await verifyRefreshToken(token);
            const accessToken = await signAccessToken(userId);
            token = await signRefreshToken(userId);
            return { accessToken, refreshToken: token };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
