function makeRefreshJwtTokenAction({
    refreshJwtToken
}) {
    return async function refreshJwtTokenAction(httpRequest) {
        try {
            const { refreshToken = '' } = httpRequest['body'];
            const tokens = await refreshJwtToken(refreshToken);
            return { statusCode: 200, body: tokens };
        } catch (error) {
            console.log('🚀 --------------> ~ file: refresh-jwt-token.js ~ line 11 ~ refreshJwtTokenAction ~ error')
            console.error(error);
            throw error;
        }
    }
}

module.exports = makeRefreshJwtTokenAction;
