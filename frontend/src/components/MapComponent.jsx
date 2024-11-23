import React, { useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
  Panorama,
} from "@pbe/react-yandex-maps";
import pinImg from "../assets/pin.png";

const MapComponent = ({ onSubmitGuess }) => {
  const [isPinPlaced, setIsPinPlaced] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);
  const [mapClass, setMapClass] = useState("mapNotTouched");
  const [isButtonThreeActive, setIsButtonThreeActive] = useState(false);

  const findStopPropagation = (event) => {
    const entries = Object.entries(event); // Convert the event object to entries
    for (const [key, value] of entries) {
      if (key === "stopPropagation" || key === "_stopPropagation") {
        console.log(`Found a stopPropagation function on key: ${key}`);
        return value; // Return the function if you need to use it
      }
    }
    console.log("No stopPropagation function found.");
    return null; // Return null if not found
  };

  const onPlaceGuess = (coords) => {
    setCurrentCoords(coords);
    setIsPinPlaced(true);
  };

  const handleMapClick = (e) => {
    const coords = e.get("coords");
    onPlaceGuess(coords);
  };

  const handleMouseEnter = (e) => {
    if (!isButtonThreeActive) {
      setMapClass("mapTouched");
    }
  };

  const handleMouseLeave = (e) => {
    if (!isButtonThreeActive) {
      setMapClass("mapNotTouched");
    }
  };

  const handleButtonOneClick = () => {
    setMapClass("mapTouched");
  };

  const handleButtonTwoClick = () => {
    setMapClass("mapNotTouched");
  };

  const handleButtonThreeClick = () => {
    setIsButtonThreeActive((prevState) => !prevState);
    if (!isButtonThreeActive) {
      setMapClass("mapTouched");
    }
  };

  return (
    <div>
      <img
        src="./assets/minsk-logo-220.png"
        className="logo"
        alt="Minsk Logo"
      />
      <div className="infoBox">
        <div className="topRow">
          <h4>Карта:</h4>
          <h4>Раунд:</h4>
          <h4>Баллы:</h4>
        </div>
        <div className="bottomRow">
          <h3 id="city">Минск</h3>
          <h3 id="roundElement">0 / 5</h3>
          <h3 id="pointsElement">0</h3>
        </div>
      </div>

      <div className="container">
        <div className="shadowBox">
          <button
            className="one button"
            onClick={handleButtonOneClick}
          ></button>
          <button
            className="two button"
            onClick={handleButtonTwoClick}
          ></button>
          <button
            className="three button"
            onClick={handleButtonThreeClick}
            style={{
              border: isButtonThreeActive ? "1px solid black" : "none",
            }}
          ></button>
        </div>
        <YMaps
          query={{
            apikey: "shmuck",
          }}
        >
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="mapCont"
          >
            <Map
              className={mapClass}
              defaultState={{ center: [53.908393, 27.558943], zoom: 10 }}
              onClick={handleMapClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              options={{
                copyrightUaVisible: false,
                copyrightProvidersVisible: false,
                autoFitToViewport: "always",
              }}
            >
              {isPinPlaced && currentCoords && (
                <Placemark
                  onMouseEnter={(e) => {
                    console.log(findStopPropagation(e));

                    e._sourceEvent.stopPropagation();
                  }}
                  onMouseLeave={(e) => {
                    e._sourceEvent.stopPropagation();
                  }}
                  geometry={currentCoords}
                  properties={{
                    hintContent: "Your Guess",
                  }}
                  options={{
                    iconLayout: "default#image",
                    iconImageHref: pinImg,
                    iconImageSize: [29, 29],
                    interactivityModel: "default#transparent",
                  }}
                />
              )}
              <FullscreenControl />
            </Map>
          </div>
        </YMaps>

        <button
          className="submitBtn"
          onClick={() => {
            if (currentCoords) {
              onSubmitGuess(currentCoords);
            } else {
              alert("Please place a pin before submitting!");
            }
          }}
          disabled={!isPinPlaced}
        >
          Поместите булавку на карту
        </button>
      </div>
      <YMaps
        query={{
          apikey: "shmuck",
        }}
      >
        <Panorama
          width="100vw"
          height="100vh"
          style={{ zIndex: "20" }}
          defaultPoint={[53.908393, 27.558943]}
        ></Panorama>
      </YMaps>
      <div className="loader-wrapper">
        <span className="loader">
          <span className="loader-inner"></span>
        </span>
      </div>
    </div>
  );
};

export default MapComponent;
