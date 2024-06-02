const express = require('express');
const profileRoute = express.Router();
const authenticateJWT = require('../middleware/jwtMW');
const profileController = require('../controllers/profileController');


profileRoute.get('/profile', authenticateJWT, profileController.getProfile);


profileRoute.post('/update', authenticateJWT, profileController.addProfile);

module.exports = profileRoute;