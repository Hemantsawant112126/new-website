const openWeatherAPIKey = '8b12ac433523f9f24fba9932331ca42e'; // Replace with your OpenWeatherMap API key
const openCageAPIKey = 'c34e29c1c3cb4633839af7cf72ab224e'; // Replace with your OpenCage API key

function getWeatherData() {
    const locationInput = document.getElementById("locationInput").value;

    // Validate input
    if (!locationInput) {
        showError("Please enter a valid location.");
        return;
    }

    // Hide previous results and error messages
    document.getElementById("locationData").style.display = 'none';
    document.getElementById("error-message").style.display = 'none';

    // Clear previous weather details
    resetWeatherDetails();

    // Fetch location data (latitude, longitude)
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${locationInput}&key=${openCageAPIKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const location = data.results[0];
                const lat = location.geometry.lat;
                const lng = location.geometry.lng;
                const formattedAddress = location.formatted;

                document.getElementById("formattedAddress").textContent = `Address: ${formattedAddress}`;
                document.getElementById("latitude").textContent = lat;
                document.getElementById("longitude").textContent = lng;
                document.getElementById("country").textContent = location.components.country || 'N/A';
                document.getElementById("city").textContent = location.components.city || 'N/A';
                document.getElementById("state").textContent = location.components.state || 'N/A';

                // Fetch weather data
                fetchWeatherData(lat, lng);
            } else {
                showError("Location not found.");
            }
        })
        .catch(error => showError("Error fetching location data."));

}

function fetchWeatherData(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${openWeatherAPIKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
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
                document.getElementById("cloudiness").textContent = `Cloudiness: ${clouds.all}%`;
                document.getElementById("sunrise").textContent = `Sunrise: ${new Date(sys.sunrise * 1000).toLocaleTimeString()}`;
                document.getElementById("sunset").textContent = `Sunset: ${new Date(sys.sunset * 1000).toLocaleTimeString()}`;
                
                // Weather icon
                document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${weather.icon}.png`;

                // Show data
                document.getElementById("locationData").style.display = 'block';
            } else {
                showError("Weather data not available for this location.");
            }
        })
        .catch(error => showError("Error fetching weather data."));
}

// Show error message
function showError(message) {
    document.getElementById("error-message").style.display = 'block';
    document.getElementById("error-message").textContent = message;
}

// Reset weather details section
function resetWeatherDetails() {
    document.getElementById("weatherDescription").textContent = '';
    document.getElementById("temperature").textContent = '';
    document.getElementById("humidity").textContent = '';
    document.getElementById("windSpeed").textContent = '';
    document.getElementById("pressure").textContent = '';
    document.getElementById("cloudiness").textContent = '';
    document.getElementById("sunrise").textContent = '';
    document.getElementById("sunset").textContent = '';
    document.getElementById("weatherIcon").src = '';
}
