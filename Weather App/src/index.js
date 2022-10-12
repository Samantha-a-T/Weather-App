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
let h2 = document.querySelector(".currentDate");
if (now.getMinutes() < 10) {
  h2.innerHTML = `${day} ${now.getHours()}:0${now.getMinutes()}`;
} else {
  h2.innerHTML = `${day} ${now.getHours()}:${now.getMinutes()}`;
}

function changeToHighC() {
  let highTempCelcius = document.querySelector("#high");
  highTempCelcius.innerHTML = `22`;
}
let highCelcius = document.querySelector("#high-celcius");

highCelcius.addEventListener("click", changeToHighC);

function changeToHighF() {
  let highTempCelcius = document.querySelector("#high");
  highTempCelcius.innerHTML = `72`;
}

let highFahrenheit = document.querySelector("#high-fahrenheit");
highFahrenheit.addEventListener("click", changeToHighF);

function changeToLowF() {
  let lowTempFahrenheit = document.querySelector("#low");
  lowTempFahrenheit.innerHTML = `43`;
}

let lowFahrenheit = document.querySelector("#low-fahrenheit");
lowFahrenheit.addEventListener("click", changeToLowF);

function changeToLowC() {
  let lowTempCelcius = document.querySelector("#low");
  lowTempCelcius.innerHTML = `6`;
}

let lowCelcius = document.querySelector("#low-celcius");
lowCelcius.addEventListener("click", changeToLowC);


//start of API getting location and weather//
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
  let h3 = document.querySelector(".currentTemp");
  h3.innerHTML = ` ${Math.round(response.data.main.temp)}°C`;
  let h1 = document.querySelector("#city-name");
  h1.innerHTML = response.data.name;
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `be81f193e065bf5feb2d944c7336968b`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(currentWeather);
}
search("Calgary");
