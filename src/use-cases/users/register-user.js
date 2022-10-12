module.exports = function makeRegisterUser({
    userDb,
    Joi,
    createError
}) {

    /**
     * @description Add user to db
     * @param {Object} userData
     * @returns {Object} access token
     */
    return async function registerUser({ userData }) {
        try {

            // Validating user data
            const validatedUserData = validateRequest(userData);

            // Adding user to db
            const addedUser = await userDb.addUser(validatedUserData);
            if (!addedUser) {
                throw createError(400, 'Something went wrong while adding user.')
            }
            return { isCreated: true };
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
            name: Joi.string().trim().required().pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/),
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