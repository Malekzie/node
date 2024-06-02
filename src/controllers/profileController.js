const validate = require('../utils/validationUtil');
const userService = require('../services/userService');
const profileRepository = require('../repositories/profileRepository');
const spellService = require('../services/spellService');

// Adding a profile
const addProfile = async (req, res) => {
    const data = req.body;
    const userId = req.userId; // Use JWT extracted userId
    console.log("Received data:", data);
    console.log("Received user ID:", userId); // Debugging info

    const rules = {
        firstName: 'required|string',
        lastName: 'required|string',
        address: 'required|string',
        city: 'required|string',
        province: 'required|string',
        postal: 'required|string',
        phone: 'required|string',
    };

    const { passes, errors } = validate(data, rules);

    if (passes) {
        try {
            await userService.populateProfile(data, userId); // Pass userId from JWT
            res.redirect('/profile/profile');
        } catch (error) {
            console.error("Profile update error:", error);
            res.status(500).send('Profile update failed. Please try again.');
        }
    } else {
        res.status(400).json(errors);
    }
};

const getProfile = async (req, res) => {
    const session = req.session;
    console.log("Session:", session);
    const userId = req.userId; // Use JWT extracted userId
    const profile = await profileRepository.findUserProfileByUserId(userId);
    const spells = await spellService.getUserSpells(userId);
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

    if (!req.session.loggedIn){
        req.session.loggedIn = true;
    }

    res.render('pages/profile/profile', { title: 'Profile', layout: 'layouts/profile', profile, spells, provinces });
};



module.exports = {
    addProfile,
    getProfile
}