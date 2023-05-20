import React, { useState } from "react";

import Weather from "./Weather";
import "./App.css";

function App() {
  let [City, setCity] = useState("");
  let [show, setShow] = useState("New York");

  function handleSubmit(event) {
    event.preventDefault();
    setShow(City);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  /* function insertCity(event) {
    setShow(event.target.innerHTML);
  } */

  return (
    <div className="App">
      <div className="main">
        {/*  <ul class="d-flex justify-content-start">
          <li value="Lisbon" onClick={insertCity}>
            Lisbon
          </li>
          <li value="Paris" onClick={insertCity}>
            Paris
          </li>
          <li value="Sydney" onClick={insertCity}>
            Sydney
          </li>
          <li value="San Francisco" onClick={insertCity}>
            San Francisco
          </li>
        </ul> */}
        <form class="form-group" onSubmit={handleSubmit}>
          <input
            type="search"
            class="form-control"
            id="city"
            onChange={updateCity}
            placeholder="Type a city..."
          />
          <input type="submit" className="btn btn-primary" value="Search" />
        </form>
        <Weather city={show} />
      </div>
      <footer class="source-footer">
        This project was coded by Thinzar Soe and is{" "}
        <a href="https://github.com/Thinzar-Soe/se-weather-app.git">
          open-sourced on GitHub
        </a>{" "}
        and{" "}
        <a href="https://github.com/Thinzar-Soe/se-weather-app.git">
          hosted on Netlify
        </a>
      </footer>
    </div>
  );
}

export default App;
