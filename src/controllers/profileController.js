const validate = require('../utils/validationUtil');
const userService = require('../services/userService');


// Get Spells based on userId
const getProfileSpells = async (req, res) => {
     const userId = req.session.userId;

     try {
          const spells = await spellsService.findSpells();
           res.render('pages/profile/profile', { spells });
     } catch (error) {
          console.error(error);
          res.status(500).send('Error fetching profile');
      }
}


const addProfile = async (req, res) => {
     const data = req.body;
     const id = req.session.userId;
     console.log("Received data:", data);
     console.log("Received id:", id)

     const rules = {
          firstName: 'required|string',
          lastName: 'required|string',
          address: 'required|string',
          city: 'required|string',
          province: 'required|string',
          postal: 'required|string',
          phone: 'required|string',
     }

     const { passes, errors} = validate(data, rules);

     if (passes) {
          try {
               await userService.populateProfile(data, id);
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
     addProfile,
     getProfileSpells
}