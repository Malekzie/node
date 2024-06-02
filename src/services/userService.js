const argon2 = require('argon2');
const userRepository = require('../repositories/userRepository'); 
const profileRepository = require('../repositories/profileRepository'); 

const authenticate = async (data) => {
    const { email, password } = data;
    const user = await userRepository.findUserByEmail(email);

    if (user && await argon2.verify(user.password, password)) {
        return user; // Make sure this includes the `id` property
    }

    return null;
};

const populateProfile = async (data, userId) => {
    const existingProfile = await profileRepository.findUserProfileByUserId(userId);

    if (existingProfile) {
        return profileRepository.updateUserProfile(data, userId);
    } else {
        const profileData = {
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            city: data.city,
            province: data.province,
            postal: data.postal,
            phone: data.phone,
            userId: userId,
        };
        return profileRepository.createUserProfile(profileData);
    }
};

module.exports = { 
     authenticate,
     populateProfile
 };
