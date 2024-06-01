const express = require('express');
const profileRoute = express.Router();

profileRoute.get('/profile', (req, res) => {
     if (req.session.loggedIn) {
          res.render('pages/profile/profile', { title: 'Profile' ,layout: 'layouts/profile'});
     } else {
          res.redirect('/auth/login');
     }
})


module.exports = profileRoute;