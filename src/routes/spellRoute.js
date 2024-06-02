const express = require('express');
const spellRoute = express.Router();
const spellController = require('../controllers/spellController');
const jwtMW = require('../middleware/jwtMW');

spellRoute.post('/create', jwtMW, spellController.createSpell);
spellRoute.get('/user', jwtMW, spellController.getUserSpells);
spellRoute.get('/', jwtMW, spellController.getAllSpells); // No authentication needed to view all spells
spellRoute.get('/:id', jwtMW, spellController.getSpellById);
spellRoute.put('/:id', jwtMW, spellController.updateSpell);
spellRoute.delete('/:id', jwtMW, spellController.deleteSpell); // endpoint to delete spell
spellRoute.get('/edit/:id', jwtMW, spellController.editSpell); // Route to edit a spell
module.exports = spellRoute;
