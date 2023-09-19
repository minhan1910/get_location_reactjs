/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";

function useGeolocation() {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState({});

  function getPosition() {
    if (!navigator.geolocation) {
      return setError("Your browser does not support geolocation");
    }
    
    navigator.geolocation.getCurrentPosition(
      (props) => {
        const { coords } = props;

        setPosition({
          lat: coords.latitude,
          lng: coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );
  }

  return {
    position,
    isLoading,
    error,
    getPosition,
  };
}

function App() {
  const [countClicks, setCountClicks] = useState(0);
  const {
    position: { lat, lng },
    error,
    isLoading,
    getPosition,
  } = useGeolocation();

  function handleClick() {
    setCountClicks((countClicks) => countClicks + 1);
    getPosition();
  }

  return (
    <>
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position ...</p>}
      {error && <p>Error</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS location:
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </>
  );
}

export default App;
