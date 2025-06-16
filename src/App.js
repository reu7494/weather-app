import { useState, useEffect } from "react";

export default function App() {
  const [location, setLocation] = useState("");

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setLocation("Geolocation is not supported by this browser.");
    }
  }

  function success(position) {
    setLocation(
      `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
    );
  }

  function error() {
    setLocation("Sorry, no position available.");
  }

  return (
    <>
      <h2>현재 위치</h2>
      <button onClick={getLocation}>Try It</button>
      <p>{location}</p>
    </>
  );
}
