const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const findUserByEmail = async (email) => {
     return await db.user.findUnique({
          where: { email: email },
          select: { email: true, password: true }
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
         data
     });
}

const createProfile = async (data) => {
}


module.exports = {
     findUserByEmail,
     findUserProfiles,
     createUser
}