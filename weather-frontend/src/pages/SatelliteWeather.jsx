import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SatelliteWeather.css';

const SatelliteWeather = () => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = 'YOUR_API_KEY'; // Replace with your real API key
      const city = 'Kolkata';
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = res.data.list.filter((_, i) => i % 8 === 0);
      setForecast(data);
    };
    fetchWeather();
  }, []);

  return (
    <div className="satellite-weather-container">
      <h2>Satellite Weather Forecast</h2>
      <div className="forecast-list">
        {forecast.map((item, idx) => (
          <div key={idx} className="forecast-card">
            <p><strong>Date:</strong> {item.dt_txt}</p>
            <p>Temperature: {item.main.temp}&deg;C</p>
            <p>Humidity: {item.main.humidity}%</p>
            <p>Condition: {item.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SatelliteWeather;