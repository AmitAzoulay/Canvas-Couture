const sendTweet = require('../services/twitterService');

/*
async function postTweet(req, res) {
    const message = req.body.message || "Hello, world! This is a test tweet from my app."; // Use incoming message or fallback

    console.log('Received request:', req.body); // Log the incoming request body

    try {
        await sendTweet(message); // Call the sendTweet function
        res.status(200).send('Tweet sent successfully!');
    } catch (error) {
        console.error('Error sending tweet:', error);
        res.status(500).send('Error sending tweet.');
    }
}
*/ 

postTweet('Hello, Twitter! This is my first tweet using the Twitter API v2.');

module.exports = {
    postTweet,
};
