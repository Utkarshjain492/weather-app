import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "87f7e1df8540582c50a46a40b95963f9";

  const fetchWeather = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();
      console.log(data);

      if (data.cod !== 200) {
        alert("Error: " + data.message);
        return;
      }

      setWeather(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            const data = await res.json();

            if (data.cod !== 200) {
              alert("Error: " + data.message);
              return;
            }

            setWeather(data);
          } catch (error) {
            console.error("Error:", error);
          }
        },
        () => {
          alert("Location access denied ❌");
        }
      );
    } else {
      alert("Geolocation not supported ❌");
    }
  };

  const getBackground = () => {
  const condition = weather?.weather?.[0]?.main;

  switch (condition) {
    case "Clear":
      return "linear-gradient(to right, #4facfe, #00f2fe)";
    case "Clouds":
      return "linear-gradient(to right, #bdc3c7, #2c3e50)";
    case "Rain":
      return "linear-gradient(to right, #2c3e50, #000000)";
    case "Snow":
      return "linear-gradient(to right, #e6f7ff, #ffffff)";
    case "Haze":
      return "linear-gradient(to right, #dfe6e9, #b2bec3)";
    default:
      return "linear-gradient(to right, #4facfe, #00f2fe)";
  }
  };

  useEffect(() => {
    fetchWeather("Delhi");
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center transition-all duration-500 backdrop-blur-sm"
      style={{ background: getBackground() }}
    >
      <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-2xl tracking-wide">
        Weather App 🌤️
      </h1>

      <SearchBar
        city={city}
        setCity={setCity}
        fetchWeather={fetchWeather}
        getLocationWeather={getLocationWeather}
        weather={weather}
      />

      <WeatherCard weather={weather} />
    </div>
  );
}

export default App;