function makeAddTasksAction({ addTasks }) {
    return async function addTasksAction(httpRequest) {
        try {
            const result = await addTasks({ taskData: httpRequest.body });
            return { statusCode: 200, body: result };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = makeAddTasksAction;
