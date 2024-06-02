const session = require('express-session');
const { findUserById } = require('../repositories/userRepository');

const sessionMW = session({
    secret: '5da5c3ac5fdd27db1cce451073c9b573',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});

const loggedInMW = (req, res, next) => {
    res.locals.loggedIn = !!req.session.userId; // Update this line to use userId
    next();
};

const saveTheme = async (req, res, next) => {
     if (req.session.userId) {
         const user = await findUserById(req.session.userId);
         if (user) {
             req.session.theme = user.theme;
         }
     }
     res.locals.theme = req.session.theme || req.cookies.theme || 'retro';
     next();
 };

const ensureAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/auth/login');
};

module.exports = {
    sessionMW,
    loggedInMW,
    saveTheme,
    ensureAuthenticated
};
