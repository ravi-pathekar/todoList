function makeUserdb({ getUserModel }) {
    return Object.freeze({
        findUserById,
        findUser,
        addUser,
    });

    async function findUserById(userId) {
        try {
            const userModel = await getUserModel();
            return await userModel.findOne({ _id: userId }).lean();
        } catch (error) {
            throw error;
        }
    }

    async function findUser(email, password) {
        try {
            const userModel = await getUserModel();
            return await userModel.findOne({ email, password }).lean();
        } catch (error) {
            throw error;
        }
    }

    async function addUser(userData) {
        try {
            const userModel = await getUserModel();
            return await userModel.create(userData);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = makeUserdb;
