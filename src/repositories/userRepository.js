const db = require('./prismaInstance');

const findUserByEmail = async (email) => {
     return await db.user.findUnique({
          where: { email: email },
          select: { email: true, password: true }
      });
}

const findUserById = async (id) => {
     return await db.user.findUnique({
          where: { id: id }
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
}


module.exports = {
     findUserByEmail,
     findUserProfiles,
     findUserById,
     createUser
}