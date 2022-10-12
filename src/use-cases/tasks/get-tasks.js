module.exports = function makeGetTasks({
    taskDb,
    createError
}) {

    /**
     * @description get all tasks
     * @returns {Object} all tasks
     */
    return async function getTasks() {
        try {

            // Getting all tasks from db
            const tasks = await taskDb.getAllTasks();
            if (!tasks.length) {
                throw createError.NotFound('Tasks not found.');
            }
            return { tasks };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}