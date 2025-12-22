import { useState } from "react";
import axios from "axios";
import "./Weather.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city or state");
      setWeather(null);
      return;
    }

    try {
      setError("");
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-app">
      <div className="weather-container">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            className="search"
            placeholder="Search city / state..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="btn-submit">
            Search
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {weather && (
          <>
            <div className="header">
              <h2>{weather.name}</h2>
              <p>{weather.sys.country}</p>
            </div>

            <div className="temp">
              <h1>{Math.round(weather.main.temp)}°C</h1>
              <p>{weather.weather[0].main}</p>
              <p>
                H: {Math.round(weather.main.temp_max)}° | L:{" "}
                {Math.round(weather.main.temp_min)}°
              </p>
            </div>

            <div className="grid">
              <div className="box">
                Visibility <br />
                <b>{weather.visibility / 1000} km</b>
              </div>

              <div className="box">
                Wind <br />
                <b>{weather.wind.speed} km/h</b>
              </div>

              <div className="box">
                Humidity <br />
                <b>{weather.main.humidity}%</b>
              </div>

              <div className="box">
                Pressure <br />
                <b>{weather.main.pressure} hPa</b>
              </div>

              <div className="box">
                Feels Like <br />
                <b>{Math.round(weather.main.feels_like)}°C</b>
              </div>

              <div className="box">
                Sunrise <br />
                <b>
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                </b>
              </div>

              <div className="box">
                Sunset <br />
                <b>
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                </b>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
