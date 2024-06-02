const db = require('./prismaInstance');
const findAgent = async () => {
     const agents = await db.agents.findMany({
          select: {
               image: true,
               name: true,
               position: true,
               email: true,
               phone: true,
               address: true
          }
     });
     return agents;
}

// const findAgentJSON = async () => {
//      const agents = await db.agents.findMany({
//           select: {
//                image: true,
//                name: true,
//                position: true,
//                email: true,
//                phone: true,
//                address: true
//           }
//      });
//      return agents;
// }



const createAgent = async (data) => {
     return await db.agents.create({
          data
     });
}

const updateAgent = async (id, data) => {};

module.exports = {
     findAgent,
     createAgent,
     // findAgentJSON
}