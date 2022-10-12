module.exports = function makeUpdateTask({
    taskDb,
    Joi,
    createError
}) {

    /**
     * @description update task
     * @param {Object} taskData
     */
    return async function updateTask({ taskId, isCompleted }) {
        try {

            // Validating task data
            const validatedTaskData = validateRequest({ taskId, isCompleted });

            // Updating task
            const updatedTask = await taskDb.updateTask(validatedTaskData);
            if (!updatedTask) {
                throw createError(400, 'Something went wrong while updating task.');
            }
            return { isUpdated: true };
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
            taskId: Joi.objectId().required(),
            isCompleted: Joi.boolean().required(),
        });
        const {error, value} = schema.validate(data);
        if (error) {
            throw createError(400, error.message);
        }
        return value;
    }
}