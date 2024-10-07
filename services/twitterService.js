const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET_KEY,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

/*const sendTweet = async (message) => {
    try {
        const response = await client.v1.tweet(message); // Use v1 endpoint for tweets
        console.log('Tweet sent:', response);
    } catch (error) {
        console.error('Error sending tweet:', error);
    }
};*/
const twitterClient=client.readWrite;

// Function to post a tweet using v2 API
async function postTweet(tweetText) {
    try {
        const response = await twitterClient.v2.tweet(tweetText); // Use twitterClient here
        console.log('Tweet posted successfully:', response);
    } catch (error) {
        console.error('Error posting tweet:', error);
    }
} 

module.exports = postTweet;


//module.exports = sendTweet;