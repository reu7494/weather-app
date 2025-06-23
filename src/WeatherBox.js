import { useEffect, useState } from "react";

export function WeatherBox({ weatherData }) {
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
        <h2 className="city">{weatherData?.location}</h2>
        <h2>
          {currentTime.toLocaleDateString({
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <h2>
          현재 시각:{" "}
          <span className="time-data">
            {currentTime.toLocaleTimeString({
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
              timeZone: "Asia/Seoul",
            })}
          </span>
        </h2>
        <h3>
          현재 온도:
          <span className="temp">{weatherData?.temperature.toFixed(2)} °C</span>
        </h3>
        <img scr={weatherData?.weatherIconUrl} alt="weather icon" />
      </div>
    </div>
  );
}
