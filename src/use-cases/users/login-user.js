module.exports = function makeLoginUser({
    userDb,
    jwt,
    Joi,
    createError,
    signAccessToken,
    signRefreshToken
}) {

    /**
     * @description login user
     * @param {Object} userData
     * @returns {Object} access token and refresh token
     */
    return async function loginUser({ userData }) {
        try {

            // Validating user data
            const validatedUserData = validateRequest(userData);
            const { email, password } = validatedUserData;

            // Getting user details from DB
            const user = await userDb.findUser(email, password);
            if (!user) {
                throw createError.NotFound('Incorrect username or password.')
            }

            // Creating access token
            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);
    
            return { accessToken, refreshToken };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * @description validate data
     * @param {Object} data
     * @returns {Object} validated data
     */
    function validateRequest(data) {
        const schema = Joi.object().keys({
            email: Joi.string().email().lowercase().trim().required(),
            password: Joi.string().trim().min(4).required()
        });
        const {error, value} = schema.validate(data);
        if (error) {
            throw createError(400, error.message);
        }
        return value;
    }
}
