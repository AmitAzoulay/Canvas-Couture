const express = require('express');
const TwitterSDK = require('../services/twitterService.js');
const router = express.Router();



router.get('/tweet/:text',(req,res)=>{
    TwitterSDK.tweet(req.params.text);
    res.send("Success")
})

module.exports = router;
