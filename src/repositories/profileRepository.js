const db = require('./prismaInstance');

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
          data
     });
}



module.exports = {
     findProfileByName,
     findProfilesByProvince,
     findProfilesByCity,
     createUserProfile
}