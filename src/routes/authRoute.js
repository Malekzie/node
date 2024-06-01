const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

authRouter.get('/login', (req, res) => {
    res.render('pages/auth/login', { title: 'Login', layout: 'layouts/auth' });
});

authRouter.get('/register', (req, res) => {
    res.render('pages/auth/register', { title: 'Register', layout: 'layouts/auth' });
});


// Register and login routes
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

authRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
}); 

module.exports = authRouter;
