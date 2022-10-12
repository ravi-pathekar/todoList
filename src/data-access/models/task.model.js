module.exports = function makeTaskModel({ dbConnection }) {
    return async function getTaskModel() {
        try {
            return dbConnection.model('Task');
        } catch (error) {
            const taskSchema = new dbConnection.Schema({
                taskName: { type: String, trim: true, required: true },
                isCompleted: { type: Boolean, default: false, required: true },
            }, {
                collection: 'tasks',
                versionKey: false
            });
            return dbConnection.model('Task', taskSchema);
        }
    };
};