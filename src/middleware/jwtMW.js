const jwtUtil = require('../utils/jwtUtil'); // Ensure the correct import
const dotenv = require('dotenv');

dotenv.config();

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    console.log("JWT token received:", token); // Debugging info

    if (!token) {
        return res.redirect('/auth/login');
    }

    const decoded = jwtUtil.verifyToken(token);
    console.log("JWT token decoded:", decoded); // Debugging info

    if (!decoded || !decoded.userId) {
        console.error("JWT token missing userId or invalid");
        return res.redirect('/auth/login');
    }

    req.userId = decoded.userId; // Ensure userId is correctly decoded
    console.log("User ID set in request:", req.userId); // Debugging info
    next();
};

module.exports = authenticateJWT;

