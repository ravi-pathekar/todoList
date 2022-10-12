function makeRegisterUserAction ({
    registerUser,
}) {
    return async function registerUserAction(httpRequest) {
        try {
            const result = await registerUser({ userData: httpRequest.body });
            return { statusCode: 200, body: result };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = makeRegisterUserAction;
