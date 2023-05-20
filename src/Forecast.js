import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

export default function App(props) {
  const forecast = props.param;
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    return days[day];
  }
  const codeMapping = {
    "01d": "CLEAR_DAY",
    "01n": "CLEAR_NIGHT",
    "02d": "PARTLY_CLOUDY_DAY",
    "02n": "PARTLY_CLOUDY_NIGHT",
    "03d": "PARTLY_CLOUDY_DAY",
    "03n": "PARTLY_CLOUDY_DAY",
    "04d": "CLOUDY",
    "04n": "CLOUDY",
    "09d": "RAIN",
    "09n": "RAIN",
    "10d": "RAIN",
    "10n": "RAIN",
    "11d": "RAIN",
    "11n": "RAIN",
    "13d": "SNOW",
    "13n": "SNOW",
    "50d": "FOG",
    "50n": "FOG",
  };
  if (forecast) {
    return (
      <div class="row forecast">
        {forecast.map(function (value, index) {
          if (index < 6) {
            return (
              <div class="col-2">
                <div class="weather-forecast-date">{formatDay(value.dt)}</div>
                <ReactAnimatedWeather
                  icon={codeMapping[value.weather[0].icon]}
                  color="#7c7c7c7"
                  size={40}
                  animate={true}
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">
                    {Math.round(value.temp.max)}&#176;
                  </span>
                  <span class="weather-forecast-temperature-min">
                    {Math.round(value.temp.min)}&#176;
                  </span>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
