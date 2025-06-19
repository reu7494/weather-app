import { useState, useEffect } from "react";
import WeatherBox from "./WeatherBox";

export default function App() {
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
      }
    }

    function success(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    }

    async function getWeather(lat, lon) {
      const apiKey = process.env.REACT_APP_WEATHER_KEY;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      let response = await fetch(url);
      let data = await response.json();
      setWeatherData(data);
      console.log(data);
    }

    getLocation();
  }, []);

  return (
    <>
      <WeatherBox weatherData={weatherData} />
      <p></p>
    </>
  );
}
