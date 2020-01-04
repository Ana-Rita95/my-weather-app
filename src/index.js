let now = new Date();
let dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = dayList[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
let currentTimeDate = document.querySelector("#current-date-time");
if (minutes < 10) {
  minutes = `0${now.getMinutes()}`;
}
currentTimeDate.innerHTML = `${day}, ${hour}:${minutes}`;

let greeting = document.querySelector("#greeting-phrase");
if (hour <= 12) {
  greeting.innerHTML = "Good Morning,";
} else {
  if (hour >= 18) {
    greeting.innerHTML = "Good Evening,";
  } else {
    greeting.innerHTML = "Good Afternoon,";
  }
}

let apiKey = "c36eed6fdb5a21af557e531f54eafda8";
let city = document.querySelector("#city-identification");
let weatherStat = document.querySelector("#weather-stat");
let temp = document.querySelector("#current-temp");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let celsiusTemperature = null;

function search(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");

  if (citySearch.value) {
    city.innerHTML = citySearch.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  } else {
    alert("Please type a city");
  }
}
function displayWeather(response) {
  weatherStat.innerHTML = response.data.weather[0].main;
  celsiusTemperature = response.data.main.temp;
  temp.innerHTML = Math.round(celsiusTemperature);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
}
let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", search);

function currentCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent).then(displayCurrent);
}

function displayCurrent(response) {
  city.innerHTML = response.data.name;
  weatherStat.innerHTML = response.data.weather[0].main;
  celsiusTemperature = response.data.main.temp;
  temp.innerHTML = Math.round(celsiusTemperature);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentCity);
}

let link = document.querySelector("#current-city-weather");
link.addEventListener("click", getCurrentPosition);

function displayFtemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCtemperature(event) {
  event.preventDefault();
  temp.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-degrees");
fahrenheitLink.addEventListener("click", displayFtemperature);

let celsiusLink = document.querySelector("#celsius-degrees");
celsiusLink.addEventListener("click", displayCtemperature);
