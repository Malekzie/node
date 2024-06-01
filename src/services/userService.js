const argon2 = require('argon2');
const userRepository = require('../repositories/userRepository'); 
const profileRepository = require('../repositories/profileRepository'); 

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

const populateProfile = async (data) => {
     const user = await userRepository.findUserById(data.id);
     if (user) {
          throw new Error('User already exists');
     }

     const profileData = {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          city: data.city,
          province: data.province,
     }
     return profileRepository.createUser(profileData);
}

module.exports = { 
     authenticate,
     populateProfile
 };
