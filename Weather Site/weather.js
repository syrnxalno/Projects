const apiKey = "api_key_code";

async function updateWeather() {
    const cityInput = document.getElementById("cityInput").value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityInput}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log(data);

        if (data.main) {
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";

            
            const weatherIcon = document.querySelector(".weather-icon");
            const weatherCondition = data.weather[0].main.toLowerCase();
            weatherIcon.src = getWeatherIcon(weatherCondition);
        } else {
            console.error("ERROR: Data Fetching");
        }
    } catch (error) {
        console.error("ERROR: Fetching weather data:", error);
    }
}

function getWeatherIcon(weatherCondition) {
   
    const weatherIcons = {
        "clear": "clear sky.png",
        "clouds": "cloudy.png",
        "rain": "rain.png",
        "snow": "snow.png",
        "mist": "mist.png"
        
       
    };

   
    return weatherIcons[weatherCondition] || "clear sky.png";
}


updateWeather();
