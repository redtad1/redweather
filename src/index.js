let currentDate = new Date();
let liDate = document.querySelector(".dateTime");
let hours = currentDate.getHours();
let mis = currentDate.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuseday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satuday",
];
let day = days[currentDate.getDay()];
if (hours < 10) {
  hours = `0${hours}`;
}
if (mis < 10) {
  mis = `0${mis}`;
}
liDate.innerHTML = `${day},${hours}:${mis}`;

function city(event) {
  event.preventDefault();
  let cityName = document.querySelector("input[type=search]").value;
  searchCity(cityName);
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", city);

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = `${temperature}℃`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrPosition);
}

function getCurrPosition(position) {
  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(city) {
  let apiKey = "2d96d64425dca1d6eda00d942a281c0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let greenButton = document.querySelector("#green-button");
greenButton.addEventListener("click", retrievePosition);

searchCity("Chicago");
