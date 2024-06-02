const spellService = require('../services/spellService');

const getAllSpells = async (req, res) => {
    try {
        const spells = await spellService.getAllSpells();
        res.render('pages/archives', { spells });
    } catch (error) {
        res.status(500).send('Error fetching spells');
    }
};

module.exports = {
    getAllSpells,
};
