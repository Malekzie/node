const spellRepository = require('../repositories/spellRepository');
const { getRandomImage } = require('../utils/imageUtil');

const createSpell = async (data, userId) => {
    const spellData = {
        ...data,
        userId: userId,
        author: data.author || 'Unknown',
        image: getRandomImage(data.element)
    };
    return await spellRepository.createSpell(spellData);
};

const getUserSpells = async (userId) => {
    return await spellRepository.getSpellsByUserId(userId);
};

const getAllSpells = async () => {
    return await spellRepository.getAllSpells();
};

const getSpellById = async (id) => {
    return await spellRepository.getSpellById(parseInt(id, 10)); // Ensure id is an integer
};

const updateSpell = async (id, data, userId) => {
    const spell = await spellRepository.getSpellById(parseInt(id, 10)); // Ensure id is an integer
    if (spell.userId !== userId) {
        throw new Error('You do not have permission to edit this spell');
    }
    return await spellRepository.updateSpell(parseInt(id, 10), data); // Ensure id is an integer
};

const deleteSpell = async (id, userId) => {
    const spell = await spellRepository.getSpellById(parseInt(id, 10)); // Ensure id is an integer
    if (spell.userId !== userId) {
        throw new Error('You do not have permission to delete this spell');
    }
    return await spellRepository.deleteSpell(parseInt(id, 10)); // Ensure id is an integer
};


module.exports = {
    createSpell,
    getUserSpells,
    getAllSpells,
    getSpellById,
    updateSpell,
    deleteSpell,
};
