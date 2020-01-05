function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${now.getHours()}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${now.getMinutes()}`;
  }
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
  let greeting = document.querySelector("#greeting-phrase");
  if (hour <= 12) {
    greeting.innerHTML = "Good Morning,";
  } else {
    if (hour >= 18) {
      greeting.innerHTML = "Good Evening,";
    } else {
      greeting.innerHTML = "Good Afternoon,";
    }
    return `${day}, ${hour}:${minutes}`;
  }
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${now.getHours()}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${now.getMinutes()}`;
  }

  return `${hour}:${minutes}`;
}

let apiKey = "c36eed6fdb5a21af557e531f54eafda8";
let city = document.querySelector("#city-identification");
let weatherStat = document.querySelector("#weather-stat");
let pressureElement = document.querySelector("#pressure");
let temp = document.querySelector("#current-temp");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let iconElement = document.querySelector("#today-icon");
let currentTimeDate = document.querySelector("#current-date-time");
let celsiusTemperature = null;

function search(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");

  if (citySearch.value) {
    city.innerHTML = citySearch.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  } else {
    alert("Please type a city");
  }
}

function displayWeather(response) {
  currentTimeDate.innerHTML = formatDate(response.data.dt * 1000);
  weatherStat.innerHTML = response.data.weather[0].main;
  celsiusTemperature = response.data.main.temp;
  temp.innerHTML = Math.round(celsiusTemperature);
  pressureElement.innerHTML = response.data.main.pressure;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", search);

function currentCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent).then(displayCurrent);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayCurrent(response) {
  currentTimeDate.innerHTML = formatDate(response.data.dt * 1000);
  city.innerHTML = response.data.name;
  weatherStat.innerHTML = response.data.weather[0].main;
  celsiusTemperature = response.data.main.temp;
  temp.innerHTML = Math.round(celsiusTemperature);
  pressureElement.innerHTML = response.data.main.pressure;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentCity);
}

let link = document.querySelector("#current-city-weather");
link.addEventListener("click", getCurrentPosition);

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
        <h3>${formatHours(forecast.dt * 1000)}</h3>
        <img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"/>
        <div class="weather-forecast-temperature">
          <strong>${Math.round(forecast.main.temp_max)}</strong>º ${Math.round(
      forecast.main.temp_min
    )}º
        </div>
        </div>
    `;
  }
}

function displayFtemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCtemperature(event) {
  event.preventDefault();
  temp.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-degrees");
fahrenheitLink.addEventListener("click", displayFtemperature);

let celsiusLink = document.querySelector("#celsius-degrees");
celsiusLink.addEventListener("click", displayCtemperature);

getCurrentPosition();
