import { useState, useEffect } from "react";
import { WeatherBox } from "./WeatherBox";
import { WeatherDescKo } from "./WeatherDescKo";

export default function App() {
  const [weatherData, setWeatherData] = useState({
    location: "",
    temp: 0,
    temp_min: 0,
    temp_max: 0,
    weatherIconUrl: undefined, //날씨 정보
    description: "",
    wind: 0,
    rain: 0,
    humidity: 0,
  });

  const API_KEY = process.env.REACT_APP_WEATHER_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      //사용자의 위도, 경도 가져오기
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
      const location = data.name; //도시명
      const wind = data.wind; //풍속
      const rain = weatherData.rain["1h"]; //강수량
      const humidity = data.main.humidity;

      const temp = Math.round(data.main.temp); //현재 온도
      const temp_min = Math.round(data.main.temp_min); //최저 온도
      const temp_max = Math.round(data.main.temp_max); //최고 온도

      const weatherIcon = data.weather[0].icon; //날씨 아이콘 코드
      const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

      const weatherId = data.weather[0].id; // 날씨 조건 코드(800은 맑음)
      const description = WeatherDescKo[weatherId];

      setWeatherData({
        location,
        temp,
        temp_min,
        temp_max,
        weatherIconUrl,
        description,
        wind,
        rain,
        humidity,
      });
      console.log("weatherId:", weatherId);
      console.log("description from WeatherDescKo:", WeatherDescKo[weatherId]);
      console.log(data);
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
