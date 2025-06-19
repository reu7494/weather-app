export default function WeatherBox({ weatherData }) {
  function formatTimezone(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}시 ${minutes}분 ${secs}초`;
  }
  return (
    <div className="weather-box">
      <div className="weather-information">
        <h2 className="city">{weatherData?.name}</h2>
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
