// controllers/branchController.js
const Branch = require('../models/branch');
const axios = require('axios');
const GOOGLE_MAPS_API_KEY = process.env.MAP_API;

// Controller to get all branches with geocoding
exports.getBranches = async (req, res) => {
try {
    const branches = await Branch.find({}); // Fetch all branches from DB

    // Fetch lat/lng for each branch using Google Geocoding API
    const geocodedBranches = await Promise.all(branches.map(async (branch) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(branch.address)}&key=${GOOGLE_MAPS_API_KEY}`;
    const response = await axios.get(geocodeUrl);
    const location = response.data.results[0].geometry.location;

      // Return the branch details with lat/lng
    return {
        name: branch.name,
        address: branch.address,
        lat: location.lat,
        lng: location.lng
    };
    }));

    // Respond with the geocoded branches
    res.json(geocodedBranches);
} catch (error) {
    res.status(500).json({ message: 'Server error', error });
}
};
