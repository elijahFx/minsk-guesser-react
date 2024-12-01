import React, { useMemo, useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  FullscreenControl,
  Polyline,
} from "@pbe/react-yandex-maps";
import pinImg from "../assets/pin.png";
import finishImg from "../assets/finish.png";
import PanoramaComponent from "./PanoramaComponent";
import { useDispatch, useSelector } from "react-redux";
import { setMapCoords } from "../slices/coordinatesSlice";

const MemoizedPanoramaComponent = React.memo(PanoramaComponent);

const MapComponent = () => {
  const [isPinPlaced, setIsPinPlaced] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);
  const [mapClass, setMapClass] = useState("mapNotTouched");
  const [isButtonThreeActive, setIsButtonThreeActive] = useState(false);
  const [count, setCount] = useState(1);
  const [placemarks, setPlacemarks] = useState([]);
  const [placeMarkToRender, setPlaceMarkToRender] = useState([]);
  const [finishes, setFinishes] = useState([]);
  const [polylines, setPolylines] = useState([]);
  const [currentPlacemark, setCurrentPlacemark] = useState([]);

  const dispatch = useDispatch();
  const panoramaCoords = useSelector(
    (state) => state.coordinates.panoramaCoordinates
  );
  const panoramaCoordsReversed = Array.from(panoramaCoords).reverse();

  const memoizedPlacemarks = useMemo(() => placemarks, [placemarks])
  const memoizedFinishes = useMemo(() => finishes, [finishes])

  const template = ymaps?.templateLayoutFactory?.createClass(
    `<div style="position: relative; width: 50px; height: 50px;">
      <img src=${pinImg} style="width: 100%; height: 100%;" />
      <div style="position: absolute; top: 33%; left: 53%; transform: translate(-50%, -50%); color: black; font-size: 14px; font-weight: bold;">
        ${count}
      </div>
    </div>`
  );

  const finishTemplate = ymaps?.templateLayoutFactory?.createClass(
    `<div style="position: relative; width: 50px; height: 50px;">
      <img src=${finishImg} style="width: 100%; height: 100%;" />
    </div>`
  );

  const handleMapLoad = (ymaps) => {
    ymaps.originalEvent?.target?.cursors.push("arrow");
    return false;
  };

  console.log(placemarks);

  const handleSubmit = () => {
    if (currentCoords) {
      setPlacemarks((prevState) => {
        return [...prevState, currentPlacemark]
      })
      setCurrentPlacemark([])
      setPolylines((prevState) => {
        const newPolyline = [panoramaCoordsReversed, currentCoords];
        return [...prevState, newPolyline];
      });

      setFinishes((prevState) => {
        if (!prevState.includes(panoramaCoordsReversed)) {
          return [...prevState, panoramaCoordsReversed];
        }
        return prevState; // Avoid duplicate entries
      });

      // Reset pin placement and increment round count
      setIsPinPlaced(false);
      setCount((prevState) => prevState + 1);
    } else {
      console.warn("Current coordinates are not set!");
    }
  };

  const onPlaceGuess = (coords) => {
    setCurrentCoords(coords);
    setCurrentPlacemark([{ coords, round: count }]);
    console.log(currentPlacemark);

    dispatch(setMapCoords(coords));
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
          <h3 id="roundElement">{count} / 5</h3>
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
          <div
            className="mapCont"
            onMouseMove={handleMouseEnter}
            onMouseOut={handleMouseLeave}
          >
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
              {currentPlacemark.length > 0 &&
                currentPlacemark.map((el, index) => {
                 return (
                  <Placemark
                    geometry={el.coords}
                    key={index}
                    options={{
                      iconLayout: ymaps?.templateLayoutFactory?.createClass(
                        `<div style="position: relative; width: 50px; height: 50px;">
                          <img src=${pinImg} style="width: 100%; height: 100%;" />
                          <div style="position: absolute; top: 33%; left: 53%; transform: translate(-50%, -50%); color: black; font-size: 14px; font-weight: bold;">
                            ${el.round}
                          </div>
                        </div>`
                      ), // Use a proper fallback
                      iconImageHref: pinImg, // Fallback to an image directly if needed
                      iconOffset: [-26, -43],
                    }}
                  />
                )})}
              {memoizedPlacemarks.length > 0 &&
                memoizedPlacemarks.flat().map((el, index) => (
                  <Placemark
                    geometry={el.coords}
                    key={index}
                    options={{
                      iconLayout: ymaps?.templateLayoutFactory?.createClass(
                        `<div style="position: relative; width: 50px; height: 50px;">
                          <img src=${pinImg} style="width: 100%; height: 100%;" />
                          <div style="position: absolute; top: 33%; left: 53%; transform: translate(-50%, -50%); color: black; font-size: 14px; font-weight: bold;">
                            ${el.round}
                          </div>
                        </div>`
                      ), // Use a proper fallback
                      iconImageHref: pinImg, // Fallback to an image directly if needed
                      iconOffset: [-26, -43],
                    }}
                  />
                ))}
              {memoizedFinishes.length > 0 &&
                memoizedFinishes.map((el, index) => {
                  return (
                    <Placemark
                      geometry={el}
                      key={index}
                      options={{
                        iconLayout: finishTemplate ? finishTemplate : ")",
                        iconOffset: [-24, -49],
                      }}
                    />
                  );
                })}
              {polylines.length > 0 &&
                polylines.map((el, index) => {
                  return (
                    <Polyline
                      key={index}
                      geometry={el}
                      options={{
                        strokeColor: "#FF0000",
                        strokeWidth: 4,
                        strokeOpacity: 0.8,
                      }}
                    />
                  );
                })}
              <FullscreenControl onMouseMove={handleMouseEnter} />
            </Map>
          </div>
        </YMaps>

        <button
          onMouseOut={handleMouseLeave}
          onMouseMove={handleMouseEnter}
          onClick={handleSubmit}
          style={isPinPlaced ? { backgroundColor: "rgb(126, 182, 68)" } : {}}
          className="submitBtn"
          disabled={!isPinPlaced}
        >
          {isPinPlaced ? "УГАДАТЬ" : "ПОМЕСТИТЕ БУЛАВКУ"}
        </button>
      </div>

      <MemoizedPanoramaComponent coords={0}/>
    </div>
  );
};

export default MapComponent;
