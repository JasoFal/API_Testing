import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './js/weather-service';

// Business Logic

async function getWeather(city) {
  const response = await WeatherService.getWeather(city)
  if (response.main) {
    printElements(response, city);
  } else {
    printError(errorMessage);
  }
}
// UI Logic

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}:
  ${error}`;
}

function printElements(data) {
  document.querySelector('#showResponse').innerText = `The current weather in ${data[1]} is ${data[0].weather[0].main}.
  The humidity in ${data[1]} is ${data[0].main.humidity}%. 
  The temperature is ${Math.round(data[0].main.temp - 273.15) * 9 / 5 + 32} degrees.
  Wind speed is ${data[0].wind.speed} mph`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
// ${apiResponse.message}