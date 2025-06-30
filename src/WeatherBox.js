import { WeatherTime } from "./WeatherTime";

export function WeatherBox({ weatherData }) {
  return (
    <div className="weather-box">
      <WeatherTime />
      <div className="weather-information">
        <h2 className="city">{weatherData?.location}</h2>
        <h2>
          <span className="temp">{weatherData?.temp.toFixed(2)} °C</span>
        </h2>
        <p>min: {weatherData?.temp_min.toFixed(2)} °C</p>
        <p>max: {weatherData?.temp_max.toFixed(2)} °C</p>
        <img src={weatherData?.weatherIconUrl} alt="weather icon" />
      </div>
    </div>
  );
}
