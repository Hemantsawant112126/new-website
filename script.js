const openWeatherAPIKey = '8b12ac433523f9f24fba9932331ca42e'; // Replace with your OpenWeatherMap API key
const openCageAPIKey = 'c34e29c1c3cb4633839af7cf72ab224e'; // Replace with your OpenCage API key

// Function to get weather and location data
function getWeatherData() {
    const locationInput = document.getElementById("locationInput").value;
    
    if (!locationInput) {
        alert("Please enter a city or address.");
        return;
    }

    console.log(`Fetching location data for: ${locationInput}`);
    
    // Get location data (latitude, longitude)
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${locationInput}&key=${openCageAPIKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const location = data.results[0];
                const lat = location.geometry.lat;
                const lng = location.geometry.lng;
                const formattedAddress = location.formatted;

                console.log("Location Data:", location);  // Log location data

                document.getElementById("formattedAddress").textContent = `Address: ${formattedAddress}`;
                document.getElementById("latitude").textContent = `Latitude: ${lat}`;
                document.getElementById("longitude").textContent = `Longitude: ${lng}`;
                document.getElementById("country").textContent = `Country: ${location.components.country || 'N/A'}`;
                document.getElementById("city").textContent = `City: ${location.components.city || 'N/A'}`;
                document.getElementById("state").textContent = `State: ${location.components.state || 'N/A'}`;

                // Now fetch the weather data for this location
                getWeather(lat, lng);
            } else {
                alert("Location not found");
            }
        })
        .catch(error => {
            console.error("Error fetching location data:", error);
            alert("Error fetching location data. Check the console for details.");
        });
}

// Function to get weather data
function getWeather(lat, lng) {
    console.log(`Fetching weather data for lat: ${lat}, lon: ${lng}`);

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${openWeatherAPIKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log("Weather Data:", data);  // Log weather data

            // Check if the response contains weather data
            if (data.weather && data.main) {
                const weather = data.weather[0];
                const main = data.main;
                const wind = data.wind;
                const sys = data.sys;
                const clouds = data.clouds;

                document.getElementById("weatherDescription").textContent = `Weather: ${weather.description}`;
                document.getElementById("temperature").textContent = `Temperature: ${main.temp}°C (Min: ${main.temp_min}°C, Max: ${main.temp_max}°C)`;
                document.getElementById("humidity").textContent = `Humidity: ${main.humidity}%`;
                document.getElementById("windSpeed").textContent = `Wind Speed: ${wind.speed} m/s`;
                document.getElementById("pressure").textContent = `Pressure: ${main.pressure} hPa`;

                // Adding more details
                document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${weather.icon}.png`;
                document.getElementById("windDirection").textContent = `Wind Direction: ${wind.deg}°`;
                document.getElementById("sunrise").textContent = `Sunrise: ${new Date(sys.sunrise * 1000).toLocaleTimeString()}`;
                document.getElementById("sunset").textContent = `Sunset: ${new Date(sys.sunset * 1000).toLocaleTimeString()}`;
                document.getElementById("cloudiness").textContent = `Cloudiness: ${clouds.all}%`;
                document.getElementById("visibility").textContent = `Visibility: ${data.visibility / 1000} km`; // Convert to km

            } else {
                console.error("Weather data not found for the given location.");
                alert("Weather data not found. Please check the entered location.");
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data. Check the console for details.");
        });
}
