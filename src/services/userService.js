const argon2 = require('argon2');
const userRepository = require('../repositories/userRepository'); 
const profileRepository = require('../repositories/profileRepository'); 

const authenticate = async (data) => {
    try {
        const user = await userRepository.findUserByEmail(data.email);
        if (user && await argon2.verify(user.password, data.password)) {
            const userId = user.id;
            return {
                user,
                userId
            }
        } else {
            return null;
        }
    } catch (error) {
        console.error("Authentication error:", error);
        throw error;
    }
};

const populateProfile = async (data, id) => {
     const user = await userRepository.findUserById(id);
     if (user) {
         const profileData = {
              firstName: data.firstName,
              lastName: data.lastName,
              address: data.address,
              city: data.city,
              province: data.province,
              userId: id,
         }
         return profileRepository.createUserProfile(profileData);
     }

}

module.exports = { 
     authenticate,
     populateProfile
 };
