const validate = require('../utils/validationUtil');
const spellService = require('../services/spellService');

const createSpell = async (req, res) => {
     const data = req.body;
     const userId = req.session.userId
     console.log(userId);


     const rules = {
          title: 'required|string',
          author: 'required|string',
          description: 'required|string',
          element: 'required|string',
          powerLevel: 'required|int',
     }

     const { passes, errors } = validate(data, rules);

     if (passes) {
          try {
               await spellService.createSpell(data, userId);
               res.redirect(301, '/profile');
          } catch (error) {
               console.error("Error creating spell:", error);
               res.status(500).send('Error creating spell');
          }
     } else {
          res.status(400).json(errors);
     }
}

module.exports = {
     createSpell
}