function makeUpdateTaskAction({
    updateTask,
}) {
    return async function updateTaskAction(httpRequest) {
        console.log('🚀 --------------> ~ file: update-tasks.js ~ line 5 ~ updateTaskAction ~ updateTaskAction')
        const { taskId = '' } = httpRequest['params'];
        const { isCompleted = '' } = httpRequest['body'];
        const result = await updateTask({ taskId, isCompleted });
        return { statusCode: 200, body: result };
    }
}

module.exports = makeUpdateTaskAction;
