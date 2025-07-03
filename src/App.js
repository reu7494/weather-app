//weather-app-gold-delta-82.vercel.app 주소

import { useState, useEffect } from "react";
import { WeatherBox } from "./WeatherBox";
import { WeatherDescKo } from "./WeatherDescKo";
import { GetWeather } from "./GetWeather";

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
      const weatherId = data.weather[0].id; // 날씨 id
      const weatherIcon = data.weather[0].icon; //날씨 아이콘
      const weather = {
        location: data.name, //도시명
        temp: Math.round(data.main.temp), //현재 온도
        temp_min: Math.round(data.main.temp_min), //최저 온도
        temp_max: Math.round(data.main.temp_max), //최고 온도
        weatherIconUrl: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`,
        description: WeatherDescKo[weatherId], //날씨 설명( ex) 800 맑음)
        wind: data.wind, //풍속
        rain: data.rain, //강수량
        humidity: data.main.humidity, //습도
      };
      setWeatherData(weather);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2 className="city-position">현재 위치 날씨</h2>
      <WeatherBox weatherData={weatherData} />
      <hr />
      <h2 className="city-position"> 다른 도시 날씨 선택</h2>
      <GetWeather />
    </>
  );
}
