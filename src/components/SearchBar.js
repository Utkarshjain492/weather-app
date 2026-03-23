import React from "react";

function SearchBar({ city, setCity, fetchWeather, getLocationWeather, weather }) {

  const isDark =
    weather?.weather?.[0]?.main === "Rain" ||
    weather?.weather?.[0]?.main === "Clouds";

  return (
    <div className="mb-6">
      
      {/* Input + Search */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather(city)}
          className={`p-3 rounded-lg border border-white/30 bg-white/20 focus:outline-none focus:ring-2 focus:ring-white ${
            isDark ? "text-white placeholder-gray-200" : "text-black placeholder-gray-600"
          }`}
        />

        <button
          onClick={() => fetchWeather(city)}
          className="bg-blue-500 hover:bg-blue-600 hover:shadow-lg text-white px-4 py-2 rounded-lg transition"
        >
          Search
        </button>
      </div>

      {/* Location Button */}
      <button
        onClick={getLocationWeather}
        className="bg-green-500 hover:bg-green-600 hover:shadow-lg text-white px-4 py-2 rounded-lg transition"
      >
        Use My Location 📍
      </button>
      
    </div>
  );
}

export default SearchBar;