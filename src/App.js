import { useState, useEffect } from "react";
import WeatherBox from "./WeatherBox";

export default function App() {
  const [location, setLocation] = useState("");

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else {
        setLocation("Geolocation is not supported by this browser.");
      }
    }

    function success(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      setLocation(`Latitude: ${lat}, Longitude: ${lon}`);
      getWeather(lat, lon);
    }

    function error() {
      setLocation("Sorry, no position available.");
    }

    async function getWeather(lat, lon) {
      const apiKey = process.env.REACT_APP_WEATHER_KEY;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
    }

    getLocation();
  }, []);

  return (
    <>
      <WeatherBox />
      <p>{location}</p>
    </>
  );
}
