const sendTweet = require('../services/twitterService');

// This function is designed to post a tweet
async function postTweet(tweetText) {
    try {
        await sendTweet(tweetText);
        console.log('Tweet posted successfully:', tweetText);
    } catch (error) {
        console.error('Error posting tweet:', error);
    }
}

module.exports = {
    postTweet,
};
