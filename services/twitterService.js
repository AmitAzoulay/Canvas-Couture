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


const TwitterSDK = {
    async tweet() {
        try {
            const text = "Hello World!"; // Your simple tweet text
            const response = await client.v1.tweet(text);

            console.log("Tweet posted successfully:", response);
            return response; // Return the response if needed
        } catch (ex) {
            console.error("Error posting to Twitter:", ex.message);
            throw new Error("Couldn't post to Twitter");
        }
    }
}

module.exports = TwitterSDK;


//module.exports = sendTweet;