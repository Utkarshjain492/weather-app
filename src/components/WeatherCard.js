import React from "react";

function WeatherCard({ weather }) {
  if (!weather?.main) return null;

  return (
      
    <div className="mt-5 p-6 rounded-2xl bg-white/20 backdrop-blur-xl shadow-2xl w-72 text-black hover:scale-105 transition duration-300 animate-fade-in">

        <h2 className="text-2xl font-semibold mb-2">{weather.name}</h2>

        <img
        src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
        alt="weather icon"
        className="mx-auto"
        />

        <p className="mt-2"></p>
        <p>🌡 Temp: {weather.main.temp}°C</p>
        <p>🌥 Condition: {weather.weather[0].main}</p>
        <p>💧 Humidity: {weather.main.humidity}%</p>
        <p>🌬 Wind: {weather.wind.speed} m/s</p>
    </div>
  );
}

export default WeatherCard;