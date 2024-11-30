const openWeatherAPIKey = '8b12ac433523f9f24fba9932331ca42e'; // Replace with your OpenWeatherMap API key
const openCageAPIKey = 'c34e29c1c3cb4633839af7cf72ab224e'; // Replace with your OpenCage API key

// Function to get weather and location data
function getWeatherData() {
    const locationInput = document.getElementById("locationInput").value;
    
    // Get location data (latitude, longitude)
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${locationInput}&key=${openCageAPIKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const location = data.results[0];
                const lat = location.geometry.lat;
                const lng = location.geometry.lng;
                const formattedAddress = location.formatted;

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
        .catch(error => alert("Error fetching location data: " + error));
}

// Function to get weather data
function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${openWeatherAPIKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("weatherDescription").textContent = `Weather: ${data.weather[0].description}`;
            document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById("windSpeed").textContent = `Wind Speed: ${data.wind.speed} m/s`;
            document.getElementById("pressure").textContent = `Pressure: ${data.main.pressure} hPa`;
        })
        .catch(error => alert("Error fetching weather data: " + error));
}
