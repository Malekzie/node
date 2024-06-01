const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function main(){
     await db.agents.createMany({
          data: [
               {
                    image: '/img/woman-1',
                    name: 'Natalie Paisley',
                    email: 'NPaisley@acme.net',
                    position: 'CEO / Co-Founder ',
                    phone: '555-555-5555',
                    address: '1234 Main St. Anytown, USA 12345'
               },
               {
                    image: '/img/man-1',
                    name: 'Omar Charanek',
                    email: 'OChar@acme.net',
                    position: "Lead Archivist",
                    phone: '555-555-5555',
                    address: '1234 Main St. Anytown, USA 12345'
               },
               {
                    image: '/img/ceo-man',
                    name: 'Michael Schmidt',
                    email: 'MSchmidt@acme.net',
                    position: 'Headmaster of the Archives',
                    phone: '555-555-5555',
                    address: '123 Main St. Anytown, USA 12345'
               },
               {
                    image: '/img/woman-2',
                    name: 'Sandy Hyuan',
                    email: 'SHyuan@acme.net',
                    position: 'Lead Scribe',
                    phone: '444-444-4444',
                    address: '1114 Main St. Anytown, USA 12345'
               },
               {
                    image: '/img/man-2',
                    name: 'Nathan Kowalski',
                    email: 'NKowalski@acme.net',
                    position: 'Lead Researcher',
                    phone: '333-333-3333',
                    address: '1122 Main St. Anytown, USA 12345'
               },
          ]
     })
}


main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })