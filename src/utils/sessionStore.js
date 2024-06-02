const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const session = require('express-session');

// Custom Session Store using Prisma
class PrismaSessionStore extends session.Store {
  constructor() {
    super();
  }

    // Retrieve a session by ID
  async get(sid, callback) {
    try {
      const session = await prisma.session.findUnique({
        where: { id: sid },
      });
      if (session) {
        callback(null, JSON.parse(session.sessionData));
      } else {
        callback(null, null);
      }
    } catch (error) {
      callback(error);
    }
  }


  // Save or update a session
  async set(sid, sessionData, callback) {
    try {
      const expiresAt = new Date(sessionData.cookie.expires);
      await prisma.session.upsert({
        where: { id: sid },
        create: { id: sid, expiresAt, sessionData: JSON.stringify(sessionData) },
        update: { expiresAt, sessionData: JSON.stringify(sessionData) },
      });
      callback(null);
    } catch (error) {
      callback(error);
    }
  }
  
 // Destroy a session by ID
  async destroy(sid, callback) {
    try {
      await prisma.session.delete({ where: { id: sid } });
      callback(null);
    } catch (error) {
      callback(error);
    }
  }
}

module.exports = PrismaSessionStore;
