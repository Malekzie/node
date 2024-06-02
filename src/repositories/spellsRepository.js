const db = require('./prismaInstance');

const findSpellsByTitle = async (title) => {
     await db.spellBook.findMany({
          where: {
               title
          }
     });
};

const findAgentSpells = async () => {
     await db.spellBook.findMany({
          where: {
               agentId: {
                    not: null
               }
          }
     });
}

const findUserSpells = async () => {
     await db.spellBook.findMany({
          where: {
               userId: {
                    not: null
               }
          }
     });
}

const findSpells = async () => {
     await db.spellBook.findMany();
}

module.exports = {
     findSpellsByTitle,
     findAgentSpells,
     findUserSpells,
     findSpells
}

// TODO: Implement the rest of the CRUD operations
// Create Spells, Update SpellsbyID and Delete SpellsbyID
// TODO: Archives Routes should show all spells
// TODO: Spells made by user only should show on profile page