const express = require('express');
const TwitterSDK = require('../services/twitterService.js');
const router = express.Router();

router.get('/tweet/:text', async (req, res) => {
    try {
        await TwitterSDK(req.params.text); // Wait for the tweet to be posted
        res.send("Tweet posted successfully");
    } catch (error) {
        console.error('Error posting tweet:', error);
        res.status(500).send("Error posting tweet");
    }
});

module.exports = router;
