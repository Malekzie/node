const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function main() {
     // Create agents
     const agentsData = [
         {
             image: '/img/agents/FAgent1',
             name: 'Eldra the Wise',
             email: 'eldra.wise@arcane-archives.com',
             position: 'Grand Archivist',
             phone: '(555) 123-4567',
             address: '100 Enchanted Way, Mystical City, MC 12345'
         },
         {
             image: '/img/agents/FAgent2',
             name: 'Lyra the Illusionist',
             email: 'lyra.illusionist@arcane-archives.com',
             position: 'Enchanter of Aesthetics',
             phone: '(555) 234-5678',
             address: '300 Mirage Lane, Illusionville, IV 34567'
         },
         {
             image: '/img/agents/FAgent3',
             name: 'Seraphina the Seeker',
             email: 'seraphina.seeker@arcane-archives.com',
             position: 'Mystic of Search',
             phone: '(555) 345-6789',
             address: '500 Visionary Avenue, Seekerton, ST 56789'
         },
         {
             image: '/img/agents/MAgent1',
             name: 'Thalor the Enchanter',
             email: 'thalor.enchanter@arcane-archives.com',
             position: 'Master of Code',
             phone: '(555) 456-7890',
             address: '200 Spellbound Street, Arcane Town, AT 23456'
         },
         {
             image: '/img/agents/MAgent2',
             name: 'Faelan the Scribe',
             email: 'faelan.scribe@arcane-archives.com',
             position: 'Lore Keeper',
             phone: '(555) 555-5555',
             address: '400 Quill Road, Scriptoria, SR 45678'
         },
         {
             image: '/img/agents/MAgent3',
             name: 'Gorim the Guardian',
             email: 'gorim.guardian@arcane-archives.com',
             position: 'Guardian of Quality',
             phone: '(555) 678-9012',
             address: '600 Sentinel Street, Guardtown, GT 67890'
         }
     ];
 
     await db.agents.createMany({ data: agentsData });
 
     // Fetch the created agents with their IDs
     const createdAgents = await db.agents.findMany();
 
     // Create spell books for each agent
     const spellBooksData = [
         {
             title: 'Scroll of Wisdom',
             description: 'A scroll containing vast knowledge and wisdom.',
             powerLevel: 5,
             element: 'Air',
             author: 'Eldra the Wise',
             agentId: createdAgents.find(agent => agent.email === 'eldra.wise@arcane-archives.com').id
         },
         {
             title: 'Illusionary Scroll',
             description: 'A scroll that creates vivid illusions.',
             powerLevel: 4,
             element: 'Light',
             author: 'Lyra the Illusionist',
             agentId: createdAgents.find(agent => agent.email === 'lyra.illusionist@arcane-archives.com').id
         },
         {
             title: 'Seeker’s Scroll',
             description: 'A scroll that enhances search and discovery.',
             powerLevel: 3,
             element: 'Water',
             author: 'Seraphina the Seeker',
             agentId: createdAgents.find(agent => agent.email === 'seraphina.seeker@arcane-archives.com').id
         },
         {
             title: 'Enchanter’s Manual',
             description: 'A manual of powerful enchantments.',
             powerLevel: 5,
             element: 'Fire',
             author: 'Thalor the Enchanter',
             agentId: createdAgents.find(agent => agent.email === 'thalor.enchanter@arcane-archives.com').id
         },
         {
             title: 'Scribe’s Codex',
             description: 'A codex of ancient lore and scripts.',
             powerLevel: 4,
             element: 'Earth',
             author: 'Faelan the Scribe',
             agentId: createdAgents.find(agent => agent.email === 'faelan.scribe@arcane-archives.com').id
         },
         {
             title: 'Guardian’s Tome',
             description: 'A tome containing protective spells.',
             powerLevel: 5,
             element: 'Stone',
             author: 'Gorim the Guardian',
             agentId: createdAgents.find(agent => agent.email === 'gorim.guardian@arcane-archives.com').id
         }
     ];
 
     await db.spellBook.createMany({ data: spellBooksData });
 }
 
 main()
     .catch(e => {
         console.error(e);
         process.exit(1);
     })
     .finally(async () => {
         await db.$disconnect();
     });