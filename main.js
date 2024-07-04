const container = document.querySelector(".container");
const searchBtn = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const notFoundData = document.querySelector(".not-found");

const APIKey = "7817e56cf73992205eb40c145376c732";

async function getWeatherData() {
  const city = document.querySelector(".search-box input").value;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
  );

  const infoCity = await response.json();
  const inputClear = document.querySelector("input");
  inputClear.value = " ";

  if (infoCity.cod === "404") {
    notFoundData.style.display = "block";
    container.style.height = "400px";
    notFoundData.classList.add(".fadeIn");
    return;
  }
  notFoundData.style.display = "none";
  notFoundData.classList.remove(".fadeIn");

  getWeatherImg(infoCity);
  getInfoWeather(infoCity);
  colorTemp(infoCity);
}

function getWeatherImg(data) {
  const imgWeather = document.querySelector(".weather-box img");
  switch (data.weather[0].main) {
    case "Clouds":
      imgWeather.src = "img/cloud.png";
      break;
    case "Rain":
      imgWeather.src = "img/rainy.png";
      break;
    case "Clear":
      imgWeather.src = "img/sun.png";
      break;
    case "Cloud":
      imgWeather.src = "img/cloudy.png";
      break;
    case "Haze":
      imgWeather.src = "img/windy.png";
      break;
    default:
      imgWeather.src = "";
  }
}

function getInfoWeather(data) {
  const humidity = document.querySelector(".weather-details .humidity span");
  const wind = document.querySelector(".weather-details .wind span");
  const temperature = document.querySelector(".weather-box .temperature");
  const description = document.querySelector(".weather-box .description");
  const cityName = document.querySelector(".info__location .city");
  const country = document.querySelector(".info__location .country");

  humidity.innerHTML = `${data.main.humidity} %`;
  wind.innerHTML = `${parseInt(data.wind.speed)} Km/h`;
  temperature.innerHTML = `${parseInt(data.main.temp - 273.15)}<span>°C</span>`;
  description.innerHTML = `${data.weather[0].description}`;
  cityName.innerHTML = `${data.name}`;
  country.innerHTML = `${data.sys.country}`;

  container.style.height = "650px";
  weatherBox.style.opacity = "1";
  weatherDetails.style.opacity = "1";
  weatherDetails.style.scale = "1";
  weatherBox.style.scale = "1";
}

function colorTemp(data) {
  const temperature = document.querySelector(".weather-box .temperature");
  const container = document.querySelector(".container");
  if (data.main.temp - 273.15 > 33) {
    temperature.style.color = "#EA560C";
    container.style.border = "1px solid #EA560C";
  } else if (data.main.temp - 273.15 > 25) {
    temperature.style.color = "orange";
    container.style.border = "1px solid orange";
  } else if (data.main.temp - 273.15 < 15) {
    temperature.style.color = "blue";
    container.style.border = "1px solid blue";
  } else {
    temperature.style.color = "white";
    container.style.border = "1px solid white";
  }
}

searchBtn.addEventListener("click", getWeatherData);
