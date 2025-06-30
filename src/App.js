export default function App() {
  const API_KEY = process.env.REACT_APP_WEATHER_KEY;
  const cityName = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${city_id}&appid=${API_KEY}`
    );
  };

  return (
    <>
      <button onClick={cityName}>
        <getWeather />
      </button>
    </>
  );
}
