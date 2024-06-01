const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

authRouter.get('/login', (req, res) => {
      const theme = req.session.theme || 'default';
    res.render('pages/auth/login', { title: 'Login', layout: 'layouts/auth', theme });
});

authRouter.get('/register', (req, res) => {
      const theme = req.session.theme || 'default';
    res.render('pages/auth/register', { title: 'Register', layout: 'layouts/auth', theme });
});


authRouter.get('/register2', (req, res) => {
    const theme = req.session.theme || 'default';
    res.render('pages/auth/register2', { title: 'Register', layout: 'layouts/auth', theme, });
});


// Register and login routes
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

authRouter.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
}); 

module.exports = authRouter;
