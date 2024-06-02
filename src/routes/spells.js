const express = require('express');
const spells = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const spellController = require('../controllers/spellController');

// Route to create a new spell
spells.post('/create', ensureAuthenticated, spellController.createSpell);

module.exports = spells;
