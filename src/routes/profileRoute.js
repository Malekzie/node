const express = require('express');
const profileRoute = express.Router();
const profileController = require('../controllers/profileController');

const provinces = [
     "Alberta",
     "British Columbia",
     "Manitoba",
     "New Brunswick",
     "Newfoundland and Labrador",
     "Nova Scotia",
     "Ontario",
     "Prince Edward Island",
     "Quebec",
     "Saskatchewan",
];

profileRoute.get('/profile', (req, res) => {
     if (req.session.loggedIn) {
          res.render('pages/profile/profile', { title: 'Profile' ,layout: 'layouts/profile', provinces});
     } else {
          res.redirect('/auth/login');
     }
})

profileRoute.post('/register2', profileController.addProfile);

module.exports = profileRoute;