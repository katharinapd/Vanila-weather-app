//const axios = require("axios").default;
let apiKey = "62bc298785543e137bc6756e514eb1c3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;
let now = new Date();
let h2 = document.querySelector("h2");
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
h2.innerHTML = `${day} ${hour}:${minutes}`;

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
  let tempInfo = Math.round(response.data.main.temp);
  let temperature = document.querySelector("h3");
  temperature.innerHTML = `${tempInfo}˚C`;

  let city = response.data.name;
  let cityName = document.querySelector("h1");
  cityName.innerHTML = `${city}`;
}
