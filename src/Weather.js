import React, { useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import ReactAnimatedWeather from "react-animated-weather";

import Forecast from "./Forecast";

export default function App(props) {
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState("01d");
  let [curDate, setCurDate] = useState(null);
  let [forecastParam, setForecastParam] = useState(null);

  function handleMessage(response) {
    let now = new Date();
    let time = now.getHours();
    let mins = now.getMinutes();
    let day = now.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    if (mins < 10) {
      setCurDate(days[day] + " " + time + ":0" + mins);
    } else {
      setCurDate(days[day] + " " + time + ":" + mins);
    }
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
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
    let showIcon = codeMapping[response.data.weather[0].icon];
    setIcon(showIcon);
    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
    let unit = "metric";
    let apiurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    axios.get(apiurl).then(show_daily_temperature);
  }

  if (props.city) {
    let appKey = "0dc40d3d7cda209ca40e77430c74cf57";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${appKey}&units=metric`;
    axios.get(url).then(handleMessage);
  }
  function show_daily_temperature(response) {
    let forecast = response.data.daily;
    setForecastParam(forecast);
  }
  if (temperature) {
    return (
      <div className="App">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h3 class="city_name">{props.city}</h3>
              <p class="left-txt">
                <span class="cur_date">{curDate}</span>
                <br />
                <br />
                <span class="description">{description}</span>
              </p>
            </div>
            <div class="detail col-2">
              <ReactAnimatedWeather
                icon={icon}
                color="#7c7c7c7"
                size={60}
                animate={true}
              />
            </div>
            <div class="detail col-6 temp">
              <strong>
                <span class="degree">{Math.round(temperature)}</span>
                <span class="centi">&#176;C</span>
              </strong>
            </div>
            <div class="detail col-4 status">
              <p class="left-txt">
                Humidity: <span class="humidity">{humidity}</span>%
                <br /> <br />
                Wind:
                <span class="wind">{wind}</span>km/h
              </p>
            </div>
          </div>
        </div>
        <Forecast param={forecastParam} />
      </div>
    );
  } else {
    return (
      <ReactLoading type="bars" color="#7c7c7c" height={667} width={375} />
    );
  }
}
