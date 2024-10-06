const infoService = require("../services/infoService")
const axios = require('axios');
require('dotenv').config();

async function getInfoData(req, res) {

    const city = req.body.city;

    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`);
        const weatherData = response.data;

        if (weatherData) {
            const responseHtml = `
                <h2>Weather for ${weatherData.name}:</h2>
                <p>Temperature: ${weatherData.main.temp} °C</p>
                <p>Condition: ${weatherData.weather[0].description}</p>
                <h2>Clothing Recommendations</h2>
                <ul class="recommendations-list">
                    ${getClothingRecommendation(weatherData.main.temp)}
                </ul>
            `;
            res.send(responseHtml);
        } else {
            res.status(500).send('Error fetching weather data');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching weather data');
    }
}
// Function to get clothing recommendations based on temperature
function getClothingRecommendation(temp) {
    if (temp < 10) {
        return '<li class="recommendation-item">Wear a heavy coat, warm gloves, and a hat.</li>';
    } else if (temp >= 10 && temp < 20) {
        return '<li class="recommendation-item">Dress in layers: a light jacket over a sweater and long pants.</li>';
    } else if (temp >= 20 && temp < 30) {
        return '<li class="recommendation-item">Lightweight clothing like t-shirts and shorts are ideal.</li>';
    } else {
        return '<li class="recommendation-item">Stay cool with summer attire: tank tops and breathable fabrics.</li>';
    }
}

module.exports = {
    getInfoData
}