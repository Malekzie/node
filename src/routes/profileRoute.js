const express = require('express');
const profileRoute = express.Router();
const profileController = require('../controllers/profileController');


profileRoute.get('/profile', (req, res) => {
     if (req.session.loggedIn) {
          res.render('pages/profile/profile', { title: 'Profile' ,layout: 'layouts/profile'});
     } else {
          res.redirect('/auth/login');
     }
})

profileRoute.post('/register2', profileController.addProfile);

module.exports = profileRoute;