import "./App.css";
import React, { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [val, setVal] = useState("");

  const weatherData = document.getElementById("weatherData");
  const weather = document.getElementById("weather");

  async function fetchData(value) {
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?city=${value}&key=775de633e379461f979cf400dcb3bfe0&include=minutely`
      );

      const json = await response.json();
      setApiResponse(JSON.parse(JSON.stringify(json)));
    } catch (error) {
      console.log(error);
    }
  }

  const resetInputField = () => {
    setVal("");
  };

  console.log(apiResponse?.data ? apiResponse?.data[0] : "Data");

  return (
    <div className="App">
      <div className="Main-text">Check the weather from around the world!</div>
      <div className="Input-Box">
        <input
          className="Input"
          type="text"
          value={val}
          onChange={(event) => {
            setInputValue(event.target.value);
            setVal(event.target.value);
          }}
        />
      </div>
      <button
        className="Button"
        onClick={() => {
          resetInputField();
          fetchData(inputValue);
        }}
      >
        Search
      </button>

      <div id="weatherData">
        <p id="weather">
          City:&nbsp;
          {apiResponse?.data ? apiResponse?.data[0]?.city_name : ""}
          <br></br>
          Country:&nbsp;
          {apiResponse?.data ? apiResponse?.data[0]?.country_code : ""}
          <br></br>
          Local time:&nbsp;
          {apiResponse?.data ? apiResponse?.data[0]?.ob_time : ""}
          <br></br>
          Temperature:&nbsp;
          {apiResponse?.data ? apiResponse?.data[0]?.app_temp : ""}°C
          <br></br>
          Weather:&nbsp;
          {apiResponse?.data ? apiResponse?.data[0]?.weather?.description : ""}
          <br></br>
          Wind:&nbsp;{apiResponse?.data
            ? apiResponse?.data[0]?.wind_spd
            : ""}{" "}
          km/h
        </p>
      </div>
    </div>
  );
}

export default App;
