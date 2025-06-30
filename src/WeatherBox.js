export function WeatherBox({ weatherData }) {
  return (
    <div className="weather-container">
      <div className="weather-top">
        <img
          src={weatherData.weatherIconUrl}
          alt="weather icon"
          className="weather-icon"
        />
        <div className="location">{weatherData.location}</div>
        <div className="temp">{weatherData.temp}°C</div>
        <div className="desc">{weatherData.description}</div>
      </div>

      <div className="weather-bottom">
        <div className="weather-detail">
          <div className="label">풍속</div>
          <div className="value">{weatherData.wind.speed}</div>
        </div>
        <div className="divider" />
        <div className="weather-detail">
          <div className="label">강수량</div>
          <div className="value">
            {weatherData.rain?.["1h"] ? `${weatherData.rain["1h"]}mm` : "0%"}
          </div>
        </div>
        <div className="divider" />
        <div className="weather-detail">
          <div className="label">습도</div>
          <div className="value">{weatherData?.humidity}%</div>
        </div>
      </div>
    </div>
  );
}
