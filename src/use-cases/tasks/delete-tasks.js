module.exports = function makeDeleteTask({
    taskDb,
    createError
}) {

    /**
     * @description delete task
     * @param {Object} taskData
     */
    return async function deleteTask(taskId) {
        try {

            // Validating task data
            const validatedTaskData = validateRequest({ taskId });

            // Deleting task
            await taskDb.deleteTask(validatedTaskData.taskId);
            return { isDeleted: true };
        } catch (error) {
            console.error(error);
            throw createError(400, 'Something went wrong while deleting task.');
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
        });
        const {error, value} = schema.validate(data);
        if (error) {
            throw createError(400, error.message);
        }
        return value;
    }
}
