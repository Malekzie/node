const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

authRouter.get('/login', (req, res) => {
    res.render('pages/auth/login', { title: 'Login', layout: 'layouts/auth' });
});

authRouter.get('/register', (req, res) => {
    res.render('pages/auth/register', { title: 'Register', layout: 'layouts/auth' });
});

authRouter.get('/profile', (req, res) => {
    if (req.session.loggedIn) {
        res.render('pages/auth/profile', { title: 'Profile' ,layout: 'layouts/main'});
    } else {
        res.redirect('/auth/login');
    }
});

// Register and login routes
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

authRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
}); 

module.exports = authRouter;
