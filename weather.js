
const weatherDataElement = document.querySelector(".weather-data");
const cityNameElement = document.getElementById("city-name");
const formElement = document.querySelector(".form");

const apiKey = "1762128b9c444796ef109eacc6e331f5";        // weather api

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityNameElement.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("Poor network connection...");
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const image = data.weather[0].icon;

        const details = [
            `Feels Like : ${Math.round(data.main.feels_like)} °C`,
            `Humidity : ${Math.round(data.main.humidity)}%`,
            `Wind Speed : ${Math.round(data.wind.speed)} m/s`
        ];

        weatherDataElement.querySelector(".temp p").textContent = `${temperature}°C`;
        weatherDataElement.querySelector(".description p").textContent = description;

        weatherDataElement.querySelector(".details").innerHTML =
            details.map(detail => `<div>${detail}</div>`).join("");

    } catch (err) {
        weatherDataElement.querySelector(".temp p").textContent = "Error";
        weatherDataElement.querySelector(".description p").textContent = "City not found";
    }
}
