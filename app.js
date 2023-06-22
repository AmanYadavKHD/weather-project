
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
console.log(req.body.cityName);

    const querry = req.body.cityName;
    const apikey = "baa66bda818742db33f74ebbb3e27b3f";

    url = "https://api.openweathermap.org/data/2.5/weather?q=" + querry + "&appid=" + apikey;

    https.get(url, function(response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const image = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"

            res.write("<h1>The weather is currently : " + weatherData.weather[0].description + "</h1>");
            res.write("The temperature in london is : " + temp);
            res.write("<img src= " + image + ">");
            res.send();

        });
    });

});

app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});
