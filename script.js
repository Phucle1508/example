const API_KEY = "99005c6e0873d08664e1f56335e3f443";
const getWeather = document.getElementById("getWeather");

function fetchAndDisplayWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const weatherInfo = document.getElementById("weatherInfo");

  weatherInfo.innerHTML = "";

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("City not found!");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const temperature = data.main.temp;
      let boxColor = "";
      if (temperature < 20) {
        boxColor = "blue";
      } else if (temperature >= 20 && temperature <= 30) {
        boxColor = "green";
      } else {
        boxColor = "red";
      }
      weatherInfo.innerHTML = `
                    <p class="inline" style ="width: 200px; margin-bottom: 0">Temperature: ${data.main.temp}°C </p> <div class="inline" style="background-color: ${boxColor}; width: 15px; height: 15px"></div>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Weather: ${data.weather[0].description}</p>`;
    })
    .catch((err) => (error.textContent = err.message));
}

getWeather.addEventListener("click", function (event) {
  event.preventDefault();

  const city = document.getElementById("city").value;
  const error = document.getElementById("error");

  error.innerHTML = "";

  if (!city) {
    error.textContent = "Please enter a city name.";
    return;
  }

  fetchAndDisplayWeather(city);
});
