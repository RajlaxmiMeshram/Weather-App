import React, { useState } from "react";
import "./style.css";
import search_icon from "../Assets/search.png";
import humidity_icon from "../Assets/humidity.gif";
import wind_icon from "../Assets/wind.gif";
import cloud_icon from "../Assets/cloud.gif";
import rain_icon from "../Assets/rain.gif";
import mist_icon from "../Assets/mist.gif";
import clear_icon from "../Assets/clear.gif";
import thunder_icon from "../Assets/thunder.gif";
import snow_icon from "../Assets/snow.gif";
import heavyrain_icon from "../Assets/heavyrain.gif";

const WeatherApp = () => {
  const [data, setData] = useState({
    humidity: 10,
    windSpeed: 2,
    temperature: 10,
    location: "London",
    image: cloud_icon,
    description: "few clouds",
  });
  const [location, setLocation] = useState("");

  const fetchData = async () => {
    try {
      if (location.trim() === "") {
        return;
      }

      const api_key = "4e047f4999b6905898b2d872df2ddc8b";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status}`);
      }

      const weatherData = await response.json();

      let imagepath = "";
      switch (weatherData.weather[0].main) {
        case "Clouds":
          imagepath = cloud_icon;
          break;
        case "Rain":
          imagepath = rain_icon;
          break;
        case "Mist":
          imagepath = mist_icon;
          break;
        case "Clear":
          imagepath = clear_icon;
          break;
        case "Haze":
          imagepath = mist_icon;
          break;
        case "Thunderstorm":
          imagepath = thunder_icon;
          break;
        case "Snow":
          imagepath = snow_icon;
          break;
        case "Dizzle":
          imagepath = heavyrain_icon;
          break;
        default:
          imagepath = cloud_icon;
          break;
      }

      setData({
        humidity: Math.round(weatherData.main.humidity),
        windSpeed: Math.round(weatherData.wind.speed),
        temperature: Math.round(weatherData.main.temp),
        location: weatherData.name,
        description: weatherData.weather[0].description,
        image: imagepath,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error.message);
    }
  };

  const handleClick = () => {
    fetchData();
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityinput"
          placeholder="search a city name"
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className="search-icon" onClick={handleClick}>
          <img src={search_icon} alt="search" />
        </div>
      </div>
      <div className="weather-img">
        {/* Use the getWeatherIcon function here based on the data.weatherCondition */}
        <img className="weather-img" src={data.image} alt="weather" />
      </div>
      <div className="weather-dec">{data.description}</div>
      <div className="weather-temp">{data.temperature}°C</div>
      <div className="weather-location">{data.location}</div>
      <div className="data-container">
        <div className="element">
          <img
            src={humidity_icon}
            alt="search"
            className="icon"
            id="humidity"
          />
          <div className="data">
            <div className="humidity-percentage">{data.humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="search" className="icon" />
          <div className="data">
            <div className="wind-rate">{data.windSpeed}km/hr</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
