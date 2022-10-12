function makeLoginUserAction({
    loginUser,
}) {
    return async function loginUserAction(httpRequest) {
        try {
            const result = await loginUser({ userData: httpRequest.body });
            return { statusCode: 200, body: result };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = makeLoginUserAction;
