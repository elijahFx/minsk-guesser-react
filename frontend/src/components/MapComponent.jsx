import React, { useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  FullscreenControl,
} from "@pbe/react-yandex-maps";
import pinImg from "../assets/pin.png";

const MapComponent = ({ onSubmitGuess }) => {
  const [isPinPlaced, setIsPinPlaced] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);

  // Function to handle when a guess is placed
  const onPlaceGuess = (coords) => {
    console.log("Guess placed at coordinates:", coords);
    setCurrentCoords(coords);
    setIsPinPlaced(true);
  };

  const handleMapClick = (e) => {
    const coords = e.get("coords");
    onPlaceGuess(coords); // Use the internal onPlaceGuess function
  };

  return (
    <div className="overMapContainer">
      <YMaps query={{
          apikey: process.env.REACT_APP_YANDEX_API_KEY
        }}>
        <Map
          defaultState={{ center: [53.908393, 27.558943], zoom: 10 }}
          onClick={handleMapClick}
          options={{
            copyrightUaVisible: false,
          }}
        >
          {/* Place a pin if it's been set */}
          {isPinPlaced && currentCoords && (
            <Placemark
              geometry={currentCoords}
              properties={{
                hintContent: "Your Guess",
              }}
              options={{
                iconLayout: "default#image",
                iconImageHref: pinImg, // Make sure this path is correct
                iconImageSize: [29, 29],
              }}
            />
          )}

          {/* Controls */}
          <ZoomControl />
          <FullscreenControl />
        </Map>
      </YMaps>

      <button
        onClick={() => {
          if (currentCoords) {
            onSubmitGuess(currentCoords);
          } else {
            alert("Please place a pin before submitting!");
          }
        }}
        disabled={!isPinPlaced}
      >
        Submit Guess
      </button>
    </div>
  );
};

export default MapComponent;
