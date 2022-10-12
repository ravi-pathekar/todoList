module.exports = function makeAddTasks({
    taskDb,
    Joi,
    createError
}) {

    /**
     * @description Add task to db
     * @param {Object} taskData
     */
    return async function addTasks({ taskData }) {
        try {

            // Validating task data
            const validatedTaskData = validateRequest(taskData);

            // Adding task to db
            const addedTask = await taskDb.addTask(validatedTaskData);
            if (!addedTask) {
                throw createError(400, 'Something went wrong while adding task.');
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
            taskName: Joi.string().trim().required(),
            isCompleted: Joi.boolean().required(),
        });
        const {error, value} = schema.validate(data);
        if (error) {
            throw createError(400, error.message);
        }
        return value;
    }
}