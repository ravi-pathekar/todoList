function makeDeleteTaskAction({
    deleteTask,
}) {
    return async function deleteTaskAction(httpRequest) {
        const { taskId = '' } = httpRequest['params'];
        const result = await deleteTask(taskId);
        return { statusCode: 204, body: result };
    }
}

module.exports = makeDeleteTaskAction;
