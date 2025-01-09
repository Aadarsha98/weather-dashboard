const apiKey = "4fc28c14f215e8a5ab50ab9c0c96e615"; 

document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    if (city) {
        fetchWeather(city);
        fetchForecast(city);
    }
});

async function fetchWeather(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    displayCurrentWeather(data);
}

function displayCurrentWeather(data) {
    document.getElementById("cityName").innerText = `City: ${data.name}`;
    document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById("windSpeed").innerText = `Wind Speed: ${data.wind.speed} m/s`;
}

async function fetchForecast(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    displayForecast(data.list);
}

function displayForecast(forecastList) {
    const forecastContainer = document.getElementById("forecastContainer");
    forecastContainer.innerHTML = "";

    for (let i = 0; i < forecastList.length; i += 8) {
        const day = forecastList[i];
        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");

        forecastItem.innerHTML = `
            <p>${new Date(day.dt_txt).toLocaleDateString()}</p>
            <p>Temp: ${day.main.temp}°C</p>
            <p>Humidity: ${day.main.humidity}%</p>
        `;
        forecastContainer.appendChild(forecastItem);
    }
}
