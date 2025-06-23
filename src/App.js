import { useState, useEffect } from "react";
import { WeatherBox } from "./WeatherBox";
import { WeatherDescKo } from "./WeatherDescKo";

export default function App() {
  const [weatherData, setWeatherData] = useState({
    location: "",
    temperature: 0,
    weatherIconUrl: undefined,
    description: "",
  });

  const API_KEY = process.env.REACT_APP_WEATHER_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  }, []);

  const getWeather = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      const location = data.name;

      const temperature = Math.round(data.main.temp);

      const weatherIcon = data.weather[0].icon;
      const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

      const weatherId = data.weather[0].id;
      const description = WeatherDescKo[weatherId];

      setWeatherData({
        location,
        temperature,
        weatherIconUrl,
        description,
      });
      console.log("weatherId:", weatherId);
      console.log("description from WeatherDescKo:", WeatherDescKo[weatherId]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <WeatherBox weatherData={weatherData} />
    </>
  );
}
