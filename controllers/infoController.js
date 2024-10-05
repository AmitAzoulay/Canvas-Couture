const infoService = require("../services/infoService")
const axios = require('axios');
require('dotenv').config();

async function getInfoData(req, res) {

    const city = req.body.city; // Get the city from the form input
    const apiKey = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data;
        res.render('info', { weather: weatherData, city });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching weather data');
    }
}


module.exports = {
    getInfoData
}