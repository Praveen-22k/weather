import { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setError("");
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log(res);
      setWeather(res.data);
    } catch (err) {
      setError("City not found");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="weather-app">
      <div className="weather-container">
        <input
          className="search"
          placeholder="Search city/State..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />

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
