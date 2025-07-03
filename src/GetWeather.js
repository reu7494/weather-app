import { useState } from "react";
import { WeatherBox } from "./WeatherBox";
import { WeatherDescKo } from "./WeatherDescKo";

export function GetWeather() {
  const [cityId, setCityId] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = process.env.REACT_APP_WEATHER_KEY;

  const cities = [
    { id: 1835848, name: "Seoul" },
    { id: 1850147, name: "Tokyo" },
    { id: 5128581, name: "New York" },
    { id: 2643743, name: "London" },
    //원하는 지역은 city.list.json에서 번호 찾아서 입력
  ];

  const fetchWeatherByCityId = async (id) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      const weatherId = data.weather[0].id;
      const weatherIcon = data.weather[0].icon;

      const weather = {
        location: data.name,
        temp: Math.round(data.main.temp),
        temp_min: Math.round(data.main.temp_min),
        temp_max: Math.round(data.main.temp_max),
        weatherIconUrl: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`,
        description: WeatherDescKo[weatherId],
        wind: data.wind,
        rain: data.rain || {},
        humidity: data.main.humidity,
      };

      setWeatherData(weather);
    } catch (error) {
      console.error("선택 도시 날씨 오류:", error);
    }
  };

  const handleChange = (e) => {
    const selectedId = e.target.value;
    setCityId(selectedId);
    fetchWeatherByCityId(selectedId);
  };

  return (
    <>
      <div className="city-position">
        <select value={cityId} onChange={handleChange}>
          <option value="">-- 도시 선택 --</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {weatherData && <WeatherBox weatherData={weatherData} />}
    </>
  );
}
