const db = require('./prismaInstance');

const findUserProfileByUserId = async (userId) => {
     return await db.userProfile.findFirst({
          where: { userId: userId },
     });
};

const findProfileByName = async (name) => {
     return await db.userProfile.findUnique({
          where: { name: name }
     });
}

const findProfilesByProvince = async (province) => {
     return await db.userProfile.findMany({
          where: { province: province }
     });
}

const findProfilesByCity = async (city) => {
     return await db.userProfile.findMany({
          where: { city: city }
     });
}

const createUserProfile = async (data) => {
     return await db.userProfile.create({
          data: {
               firstName: data.firstName,
               lastName: data.lastName,
               address: data.address,
               city: data.city,
               province: data.province,
               phone: data.phone,
               postal: data.postal,
               user: {
                    connect: {
                         id: data.userId
                    }
               }
          }
     });
};

const updateUserProfile = async (data, userId) => {
     const profile = await findUserProfileByUserId(userId);
     if (profile) {
          return await db.userProfile.update({
               where: { id: profile.id },
               data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    city: data.city,
                    province: data.province,
                    phone: data.phone,
                    postal: data.postal,
               }
          });
     }
     throw new Error('Profile not found');
};

module.exports = {
     findUserProfileByUserId,
     findProfileByName,
     findProfilesByProvince,
     findProfilesByCity,
     createUserProfile,
     updateUserProfile,
}