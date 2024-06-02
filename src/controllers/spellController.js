const spellService = require('../services/spellService');

const createSpell = async (req, res) => {
    try {
        const spell = await spellService.createSpell(req.body, req.userId);
        res.status(201).redirect('/archives'); // Redirect to archives after creation
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserSpells = async (req, res) => {
    try {
        const spells = await spellService.getUserSpells(req.userId);
        res.status(200).json(spells);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllSpells = async (req, res) => {
    try {
        const spells = await spellService.getAllSpells();
        res.status(200).json(spells);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSpellById = async (req, res) => {
    try {
        const spell = await spellService.getSpellById(req.params.id);
        res.status(200).json(spell);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSpell = async (req, res) => {
    try {
        const spell = await spellService.updateSpell(req.params.id, req.body, req.userId);
        res.status(200).redirect('/archives');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteSpell = async (req, res) => {
    try {
        await spellService.deleteSpell(req.params.id, req.userId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editSpell = async (req, res) => {
     try {
         const spell = await spellService.getSpellById(req.params.id);
         if (!spell) {
             throw new Error('Spell not found');
         }
         const elements = [
             'Fire', 'Water', 'Air', 'Earth', 'Light', 'Darkness', 
             'Electricity', 'Ice', 'Metal', 'Nature', 'Poison', 
             'Shadow', 'Sound', 'Time'
         ];
         res.render('pages/editSpell', { title: 'Edit Spell', spell, elements });
     } catch (error) {
         console.error('Error fetching spell for editing:', error); // Log the error details
         res.status(500).send('Error fetching spell for editing');
     }
 };

module.exports = {
    createSpell,
    getUserSpells,
    getAllSpells,
    getSpellById,
    updateSpell,
    deleteSpell,
    editSpell
};
