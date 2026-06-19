// Your active OpenWeatherMap API Key
const apiKey = 'e35f7db468599be44737903b99698fd2'; 

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

// Function to fetch weather data from the API
async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        
        // Update the HTML with the live data
        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        
    } catch (error) {
        cityName.textContent = "Oops!";
        temperature.textContent = "--°C";
        description.textContent = error.message;
    }
}

// Listen for a click on the search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});

// Automatically load the weather for the default city when the page opens
getWeather(cityInput.value);