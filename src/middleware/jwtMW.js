const jwtUtil = require('../utils/jwtUtil'); // Ensure the correct import
const dotenv = require('dotenv');

dotenv.config();

// Middleware to authenticate JWT and attach user information to the request object
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/auth/login'); // Redirect to login if no token
    }

    const decoded = jwtUtil.verifyToken(token);

    if (!decoded || !decoded.userId) {
        return res.redirect('/auth/login'); // Redirect to login if token is invalid
    }

    req.userId = decoded.userId; // Ensure userId is correctly decoded
    next();
};

module.exports = authenticateJWT;

