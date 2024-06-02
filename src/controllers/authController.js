require('dotenv').config();
const authService = require('../services/authService');
const validate = require('../utils/validationUtil');
const userService = require('../services/userService');

// Controller Method for registering a user
const register = async (req, res) => {
     const data = req.body;
     console.log(data);

     const rules = {
          email: 'required|email',
          password: 'required|string|min:6|max:255',
          confirmPassword: 'required|string|min:6|max:255|same:password'
     }

     const { passes, errors } = validate(data, rules);

     if (passes) {
          try {
               await authService.register(data);
               res.redirect(301, '/auth/login')
          } catch (error) {
               console.error("Registration error:", error); // Log the error details
               res.status(500).send('Registration failed. Please try again.');
          }
     } else {
          res.status(400).json(errors);
     }
}


const login = async (req, res) => {
     const data = req.body;
     try {
          const user = await userService.authenticate(data);
          if (user) {
               req.session.user = user;
               req.session.loggedIn = true;
               req.session.userId = user.userId;
               res.redirect(302, '/profile/profile');
          } else {
               res.status(401).render('auth/login', { error: 'Invalid email or password' });
          }
     } catch (error) {
          console.error("Login error:", error);
          res.status(500).send('Internal Server Error');
     }
};



module.exports = {
     register,
     login,
}