const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to clean up expired sessions from the database
const cleanupExpiredSessions = async () => {
  const now = new Date();
  await prisma.session.deleteMany({
    where: {
      expiresAt: { lt: now },
    },
  });
};

// Run cleanup every hour
setInterval(cleanupExpiredSessions, 1000 * 60 * 60);
