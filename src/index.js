let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let h2 = document.querySelector("#last-updated");
if (now.getMinutes() < 10) {
  h2.innerHTML = `Last updated: Today at ${now.getHours()}:0${now.getMinutes()}`;
} else {
  h2.innerHTML = `Last updated: Today at ${now.getHours()}:${now.getMinutes()}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function newCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  search(searchInput.value);
}
function search(city) {
  let apiKey = `be81f193e065bf5feb2d944c7336968b`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(currentWeather);
}

let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", newCity);

function displayCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let getCurrentWeather = document.querySelector("#current-location-button");
getCurrentWeather.addEventListener("click", displayCurrentWeather);

function currentWeather(response) {
  let h3 = document.querySelector("#current-temp");
  h3.innerHTML = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#city-name");
  h1.innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  let description = document.querySelector("#weather-description");
  let wind = document.querySelector("#wind-speed");
  description.innerHTML = response.data.weather[0].description;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h winds`;
  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `be81f193e065bf5feb2d944c7336968b`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(currentWeather);
}

function changeCelsius(event) {
  event.preventDefault();
  document.querySelector("#change-to-celsius").classList.add("active");
  document.querySelector("#change-to-fahrenheit").classList.remove("active");
  document.querySelector("#current-temp").innerHTML =
    Math.round(celsiusTemperature);
}

document
  .querySelector("#change-to-celsius")
  .addEventListener("click", changeCelsius);

function changeFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#change-to-celsius").classList.remove("active");
  document.querySelector("#change-to-fahrenheit").classList.add("active");
  document.querySelector("#current-temp").innerHTML = Math.round(
    (celsiusTemperature * 9) / 5 + 32
  );
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 forecastColumn">
      <div class= "weekDayWrapper">
      <div class="weekDay">${formatDay(forecastDay.dt)}</div>  

        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" width="60" /> 
            <div class="max-temperature"> <strong>${Math.round(
              forecastDay.temp.max
            )}</strong> </div>
            <div class="min-temperature">${Math.round(
              forecastDay.temp.min
            )}</div> </div></div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `be81f193e065bf5feb2d944c7336968b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

document
  .querySelector("#change-to-fahrenheit")
  .addEventListener("click", changeFahrenheit);

let celsiusTemperature = null;

search("Calgary");
