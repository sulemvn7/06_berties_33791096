// Create a new router
const express = require("express")
const router = express.Router()

const request = require('request');


// Handle our routes
router.get('/',function(req, res, next){
    res.render('index.ejs')
});

router.get('/about',function(req, res, next){
    res.render('about.ejs')
});

router.get('/weather', function(req, res, next) {
    let city = req.query.city || 'London';
    let apiKey = process.env.OPENWEATHER_API_KEY || 'c96998eb14d451b90a6bd8cb32211b85';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if(err) return next(err);

        try {
            let weather = JSON.parse(body);
            let weatherMessage = "";

            if (weather && weather.main) {
                weatherMessage = `🌡️ It is ${weather.main.temp}°C in ${weather.name}!<br>
                                  Humidity: ${weather.main.humidity}%<br>
                                  Wind Speed: ${weather.wind.speed} m/s`;
            } else {
                weatherMessage = `No weather data found for "${city}"`;
            }

            res.render('weather', { weatherMessage });
        } catch(e) {
            res.render('weather', { weatherMessage: "Error parsing weather data." });
        }
    });
});



// Export the router object so index.js can access it
module.exports = router
