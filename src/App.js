import { useState, useEffect } from "react";
import WeatherBox from "./WeatherBox";

export default function App() {
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  }, []);
  const getWeather = async (lat, lon) => {
    const apiKey = process.env.REACT_APP_WEATHER_KEY;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=ko`
      );
      const data = await res.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <WeatherBox weatherData={weatherData} />
    </>
  );
}
