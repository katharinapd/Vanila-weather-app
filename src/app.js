//const axios = require("axios").default;
let apiKey = "62bc298785543e137bc6756e514eb1c3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;
let now = new Date();
let temp = document.querySelector("#dataInfo");
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
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
temp.innerHTML = `${day} ${hour}:${minutes}`;

function searchResult(event) {
  event.preventDefault();
  let city = document.getElementById("input-field").value;
  console.log(city);

  axios.get(`${apiUrl}&appid=${apiKey}&q=${city}`).then(showTemperature);
}
let inputField = document.querySelector("#submit");
inputField.addEventListener("click", searchResult);

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  //   let locationCity = document.querySelector("h1");
  //   locationCity.innerHTML = "";
  axios.get(`${apiUrl}&lat=${lat}&lon=${long}`).then(showTemperature);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#location");
currentLocation.addEventListener("click", showLocation);

function showTemperature(response) {
  console.log(response.data);

  celsiusTemp = response.data.main.temp;

  let tempInfo = Math.round(celsiusTemp);
  let temperature = document.querySelector("#degree");
  temperature.innerHTML = `${tempInfo}`;

  let city = response.data.name;
  let cityName = document.querySelector("h1");
  cityName.innerHTML = `${city}`;

  let descriptionElement = document.querySelector("#descr");
  cityName.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidityElelment = document.querySelector("humidity");
  humidity.innerHTML = response.data.main.humidity;
  let iconElement = document.querySelector("icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  console.log(fahrenheitTemp);

  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

function displayCelsiusTemp(event) {
  console.log("c");
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

// let description = response.data.weather[0].description;
//let descriptionInfo = document.querySelector("#descr");
//descriptionInfo.innerHTML = `${Clear}`;
