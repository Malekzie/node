const validate = require('../utils/validationUtil');
const userService = require('../services/userService');


const addProfile = async (req, res) => {
     const data = req.body;
     console.log("Received data:", data);

     
     const rules = {
          firstName: 'required|string',
          lastName: 'required|string',
          address: 'required|string',
          city: 'required|string',
          province: 'required|string',
     }

     const { passes, errors} = validate(data, rules);

     if (passes) {
          try {
               await userService.populateProfile(data);
               res.redirect(301, '/auth/login');
          } catch (error) {
               console.error("Registration error:", error); // Log the error details
               res.status(500).send('Registration failed. Please try again.');
          }
     } else {
          res.status(400).json(errors);
     }
}

module.exports = {
     addProfile
}