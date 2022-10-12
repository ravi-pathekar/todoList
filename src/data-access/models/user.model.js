module.exports = function makeUserModel({ dbConnection }) {
    return async function getUserModel() {
        try {
            return dbConnection.model('User');
        } catch (error) {
            const userSchema = new dbConnection.Schema({
              email: { type: String, trim: true, required: true },
              name: { type: String, trim: true, required: true, default: '' },
              password: { type: String, trim: true, required: true },
            }, {
                collection: 'users',
                versionKey: false
            });
            return dbConnection.model('User', userSchema);
        }
    };
};