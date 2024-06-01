const argon2 = require('argon2');
const userRepository = require('../repositories/userRepository'); // Ensure correct path

const authenticate = async (data) => {
    try {
        const user = await userRepository.findUserByEmail(data.email);
        if (user && await argon2.verify(user.password, data.password)) {
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Authentication error:", error);
        throw error;
    }
};

module.exports = { authenticate };
