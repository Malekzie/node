const userRepository = require('../repositories/userRepository');
const argon2 = require('argon2');

// Business Logic for registering a user
const register = async (data, id) => {
     // Check if user already exists
     const hashedPassword = await argon2.hash(data.password);
     const existingUser = await userRepository.findUserByEmail(data.email);

     if (existingUser) {
          throw new Error('User already exists');
     }

     const userData = {
          name: data.name,
          email: data.email,
          password: hashedPassword,
     };

     const regData =  userRepository.createUser(userData);
     id = regData.id;
     return regData;
}


// Business Logic for logging in a user
const login = async (data) => {
     const user = await userRepository.findUserByEmail(data.email);
     if (!user) throw new Error('User not found');

     const passwordMatch = await argon2.verify(user.password, data.password);
     if (!passwordMatch) throw new Error('Invalid credentials');

     return user;
}



module.exports = {
     register,
     login
}