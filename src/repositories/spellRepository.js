const db = require('./prismaInstance');

const createSpell = async (data) => {
    return await db.spellBook.create({
        data: {
            title: data.title,
            description: data.description,
            powerLevel: parseInt(data.powerLevel, 10),
            element: data.element,
            author: data.author,
            userId: data.userId,
            image: data.image,
        },
    });
};

const getSpellsByUserId = async (userId) => {
    return await db.spellBook.findMany({
        where: { userId: userId },
    });
};

const getAllSpells = async () => {
    return await db.spellBook.findMany();
};

const getSpellById = async (id) => {
     return await db.spellBook.findUnique({
         where: { id: parseInt(id, 10) }, // Ensure id is an integer
     });
 };

 const updateSpell = async (id, data) => {
     return await db.spellBook.update({
         where: { id: parseInt(id, 10) }, // Ensure id is an integer
         data: {
             title: data.title,
             description: data.description,
             powerLevel: parseInt(data.powerLevel, 10), // Ensure powerLevel is an integer
             element: data.element,
         },
     });
 };

// Repository method to delete a spell by ID
const deleteSpellById = async (id) => {
    try {
        return await db.spellBook.delete({
            where: { id: parseInt(id) }
        });
    } catch (error) {
        console.error('Error in deleteSpellById:', error);
        throw error;
    }
};

module.exports = {
    createSpell,
    getSpellsByUserId,
    getAllSpells,
    getSpellById,
    updateSpell,
    deleteSpellById,
};
