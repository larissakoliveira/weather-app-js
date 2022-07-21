
let weatherData = {
  apiKey: "b0404e5de8ee4a47b52141722222007",
  getWeatherApi: function (searchedCity) {
    document.querySelector(".city-error").textContent = "";
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${this.apiKey}
      &q=${searchedCity}&aqi=no`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data))
      .catch(
        (err) =>
          (document.querySelector(".city-error").textContent =
            "City not found!!!")
      );
  },
  displayWeather: function (data) {
    const cityEl = document.querySelector(".city");
    const tempEl = document.querySelector(".temp");
    const dateEl = document.querySelector(".date");
    const conditionEl = document.querySelector(".condition");
    const iconImageEl = document.getElementById("condition-icon");
    const humidityEl = document.querySelector(".humidity");
    const uvEl = document.querySelector(".uv");
    const feelsLikeEl = document.querySelector(".feels-like-c");
    const windKphEl = document.querySelector(".wind-kph");
    
    const { name, region, localtime } = data.location;
    const {
      temp_c,
      temp_f,
      condition: { text, icon },
      wind_kph,
      humidity,
      feelslike_c,
      feelslike_f,
      uv
    } = data.current;
    cityEl.textContent = `${name}, ${region}`;
    tempEl.textContent = `${temp_c} °C  /  ${temp_f} °F`;
    dateEl.textContent = localtime;
    conditionEl.textContent = text;
    iconImageEl.src = icon;
    humidityEl.textContent = `Humidity: ${humidity}%`;
    uvEl.textContent = `UV index: ${uv}`;
    feelsLikeEl.textContent = `Feels Like: ${feelslike_c} °C /  ${feelslike_f} °F`;
    windKphEl.textContent = `Wind Speed: ${wind_kph}km/h`;
    document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${name}")`;
    document.getElementById("app-card").classList.remove("loading");
  },
  searchCity: function () {
    const inputCity = document.querySelector(".search-bar").value;
    this.getWeatherApi(inputCity);
  }
};

document.querySelector(".search-btn").addEventListener("click", function () {
    weatherData.searchCity();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weatherData.searchCity();
    }
  });

  weatherData.getWeatherApi("Rio de Janeiro");
