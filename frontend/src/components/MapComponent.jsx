import React, { useRef, useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
} from "@pbe/react-yandex-maps";
import pinImg from "../assets/pin.png";
import SubmitButton from "./SubmitButton";
import PanoramaComponent from "./PanoramaComponent";
import { useDispatch } from "react-redux";
import { setMapCoords } from "../slices/coordinatesSlice";

const MemoizedPanoramaComponent = React.memo(PanoramaComponent);

const MapComponent = ({ onSubmitGuess }) => {
  const [isPinPlaced, setIsPinPlaced] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);
  const [mapClass, setMapClass] = useState("mapNotTouched");
  const [isButtonThreeActive, setIsButtonThreeActive] = useState(false);
  const [count, setCount] = useState(1);
  const [placemarks, setPlacemarks] = useState([]);

  const dispatch = useDispatch()

  const template = ymaps?.templateLayoutFactory?.createClass(
    `<div style="position: relative; width: 50px; height: 50px;">
      <img src=${pinImg} style="width: 100%; height: 100%;" />
      <div style="position: absolute; top: 33%; left: 53%; transform: translate(-50%, -50%); color: black; font-size: 14px; font-weight: bold;">
        ${count}
      </div>
    </div>`
  );

  const mapRef = useRef(null);

  const handleMapLoad = (ymaps) => {
    ymaps.originalEvent?.target?.cursors.push("arrow");
    return false;
  };

  const onPlaceGuess = (coords) => {
    setCurrentCoords(coords);
    dispatch(setMapCoords(coords))
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
    e.originalEvent?.target?.cursors.push("arrow");
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
              border: isButtonThreeActive ? "3px solid black" : "none",
              backgroundPosition: isButtonThreeActive ? "4px 3px" : "7px 5px",
            }}
          ></button>
        </div>
        <YMaps
          query={{
            apikey: "b758d8a7-6b04-428a-8075-287f16ed6f8d&lang=ru_RU",
          }}
        >
          <div className="mapCont" onMouseOut={handleMouseLeave}>
            <Map
              onLoad={(e) => handleMapLoad(e)}
              className={`${mapClass} custom-cursor`}
              defaultState={{ center: [53.908393, 27.558943], zoom: 10 }}
              onClick={handleMapClick}
              onMouseEnter={handleMouseEnter}
              cursors={"auto"}
              options={{
                copyrightUaVisible: false,
                copyrightProvidersVisible: false,
                yandexMapDisablePoiInteractivity: true,
                suppressMapOpenBlock: true,
                copyrightLogoVisible: false,
                autoFitToViewport: "always",
              }}
            >
              {isPinPlaced && currentCoords && (
                <Placemark
                  geometry={currentCoords}
                  options={{
                    iconLayout: template ? template : ")",
                    iconOffset: [-26, -43],
                  }}
                />
              )}
              <FullscreenControl onMouseMove={handleMouseEnter} />
            </Map>
          </div>
        </YMaps>

        <SubmitButton
          onSubmitGuess={onSubmitGuess}
          isPinPlaced={isPinPlaced}
          currentCoords={currentCoords}
        />
      </div>
      
        <MemoizedPanoramaComponent />
    
    </div>
  );
};

export default MapComponent;
