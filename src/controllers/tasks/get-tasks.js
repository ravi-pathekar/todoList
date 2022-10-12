function makeGetTasksAction({
    getTasks,
}) {
    return async function getTasksAction(httpRequest) {
        try {
            const result = await getTasks();
            return { statusCode: 200, body: result };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = makeGetTasksAction;
