import { useEffect, useState } from "react";

export default function WeatherBox({ weatherData }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="weather-box">
      <div className="weather-information">
        <h2 className="city">{weatherData?.name}</h2>
        <h2>
          현재 시각:{" "}
          <span className="time-data">
            {currentTime.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            <br />
            {currentTime.toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </h2>
        <h3>
          현재 온도:
          <span className="temp">
            {(weatherData?.main.temp - 273.15).toFixed(2)} °C
          </span>
        </h3>
        <h3>
          체감 온도:
          <span className="temp">
            {(weatherData?.main.feels_like - 273.15).toFixed(2)}°C
          </span>
        </h3>
        <h4>
          습도:<span className="temp">{weatherData?.main.humidity}%</span>
        </h4>
        <h4>
          기압:<span className="temp">{weatherData?.main.pressure}hPa</span>
        </h4>
        <p>
          구름 분포도:
          <span className="temp">{weatherData?.clouds.all}%</span>
        </p>
      </div>
    </div>
  );
}
