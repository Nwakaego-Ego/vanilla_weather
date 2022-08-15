function time(date) {
  let currentTime = new Date(date);

  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednessday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentTime.getDay()];
  return `${day} ${hour} : ${minutes}`;
}

let input = document.getElementById("input");
let form = document.getElementById("form");
form.addEventListener("submit", searchButton);

function searchButton(event) {
  event.preventDefault();

  citySearch(cityInput.value);
}

function citySearch(city) {
  let cityInput = document.getElementById("cityInput");
  let cityNow = (document.getElementById("city").innerHTML = cityInput.value);
  let apiKey = "0af0ba164e313d2bc52c846cbc253f06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weather);
}

function weather(response) {
  console.log(response);
  let temperature = document.getElementById("temperature");
  let humidity = document.getElementById("humidity");
  let wind = document.getElementById("wind");
  let description = document.getElementById("description");
  // if(response.data.weather[0].description === Rain){
  //     change background
  // }
  let weatherUpdate = document.getElementById("weather-update");
  //   let currentLocation = `Current location response.data.name`;
  let cityInput = document.getElementById("cityInput");
  let city = (document.getElementById("city").innerHTML = cityInput.value);
  let date = document.getElementById("date");
  let icon = document.getElementById("icon");

  temperature.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = response.data.wind.speed;
  date.innerHTML = time(response.data.dt * 1000);
  description.innerHTML = response.data.weather[0].description;
  weatherUpdate.innerHTML = response.data.name;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.innerHTML = ("alt", response.data.weather[0].description);
}

citySearch("Lagos");
