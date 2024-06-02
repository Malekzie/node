const db = require('./prismaInstance');

const findUserByEmail = async (email) => {
    return await db.user.findUnique({
        where: { email: email },
        select: { email: true, password: true, id: true }
    });
}

const findUserById = async (id) => {
    console.log("User ID in findUserById:", id); // Debugging info
    return await db.user.findUnique({
        where: { id: id },
    });
}

const findUserProfiles = async () => {
    return await db.userProfile.findMany({
        select: {
            firstName: true,
            lastName: true,
            address: true,
            phone: true,
        }
    });
}

const createUser = async (data) => {
    return await db.user.create({
        data,
        select: {
            id: true,
            email: true
        },
    });
}

const createProfile = async (data) => {
    return await db.userProfile.create({
        data
    });
}

module.exports = {
    findUserByEmail,
    findUserProfiles,
    findUserById,
    createUser,
    createProfile
}
