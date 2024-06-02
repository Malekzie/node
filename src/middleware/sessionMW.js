const session = require('express-session');
const { findUserById } = require('../repositories/userRepository');
const PrismaSessionStore = require('../utils/sessionStore'); // Import custom session store
const dotenv = require('dotenv');

dotenv.config();

const SECRET_KEY = process.env.SESSION_SECRET;

// Session middleware configuration using the custom Prisma session store
const sessionMW = session({
    store: new PrismaSessionStore(), // Use the custom Prisma session store
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 1000 * 60 * 60 * 24 // Cookie expiry: 24 hours
    }
});

// Middleware to check if user is logged in and set a local variable
const loggedInMW = (req, res, next) => {
    res.locals.loggedIn = !!req.session.userId;
    next();
};

// Middleware to save the user's theme preference in the session
const saveTheme = async (req, res, next) => {
    if (req.session.userId) {
        const user = await findUserById(req.session.userId);
        if (user) {
            req.session.theme = user.theme;
        }
    }
    res.locals.theme = req.session.theme || req.cookies.theme || 'retro';
    next();
}

module.exports = {
    sessionMW,
    loggedInMW,
    saveTheme,
};
