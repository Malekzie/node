const spellService = require('../services/spellService');
const spellRepository = require('../repositories/spellRepository');

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

// Controller method to delete a spell
const deleteSpell = async (req, res) => {
    const spellId = req.params.id;
    console.log(`Attempting to delete spell with ID: ${spellId}`);

    try {
        await spellRepository.deleteSpellById(spellId);
        console.log(`Successfully deleted spell with ID: ${spellId}`);
        res.redirect('/profile/profile'); // Redirect to the profile page after deletion
    } catch (error) {
        console.error('Error deleting spell:', error);
        res.status(500).json({ message: 'Error deleting spell' });
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
