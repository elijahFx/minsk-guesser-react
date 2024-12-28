import React, { useMemo, useState, useEffect, useRef, useLayoutEffect } from "react";
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
import { addRound, setGameEnd, setMapCoords, setCurrentPlayInfo } from "../slices/coordinatesSlice";
import { Notification } from "./Notification";
import { getRandomCoords } from "../utils/getRandomCoords";
import LoaderComponent from "./LoaderComponent";
import EndGameComponent from "./EndGameComponent";
import RightHUDComponent from "./RightHUDComponent";
import UpHUDComponent from "./UpHUDComponent";
import { evaluateDistance } from "../utils/evaluateGame";
import { io } from "socket.io-client";

let socket = io("http://localhost:3001");

const MemoizedPanoramaComponent = React.memo(PanoramaComponent);
const MAX_ROUNDS = 5;

const MapComponent = () => {
  const endGameClass = `endGame`;
  const userName = useSelector((state) => state?.auth?.user?.name);
  const { time, totalRounds } = useSelector(
    (state) => state?.coordinates?.currentPlayInfo
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isPinPlaced, setIsPinPlaced] = useState(false);
  const [currentCoords, setCurrentCoords] = useState(null);
  const [mapClass, setMapClass] = useState("mapNotTouched");
  const [isButtonThreeActive, setIsButtonThreeActive] = useState(false);
  const [count, setCount] = useState(1);
  const [placemarks, setPlacemarks] = useState([]);
  const [finishes, setFinishes] = useState([]);
  const [polylines, setPolylines] = useState([]);
  const [currentPlacemark, setCurrentPlacemark] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [propsPanoramaCoords, setPropsPanoramaCoords] = useState(
    getRandomCoords()
  );
  const [panoramaKey, setPanoramaKey] = useState(0);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [grade, setGrade] = useState((0).toFixed(1));

  const mapRef = useRef(null);

  const currentRound = useSelector((state) => state.coordinates.round);

  const dispatch = useDispatch();

  const panoramaCoords = useSelector(
    (state) => state.coordinates.panoramaCoordinates
  );
  const panoramaCoordsReversed = Array.from(panoramaCoords).reverse();

  const memoizedPlacemarks = useMemo(() => placemarks, [placemarks]);
  const memoizedFinishes = useMemo(() => finishes, [finishes]);

  const [polylineLengths, setPolylineLengths] = useState([]); // Store lengths of polylines

  const calculatePolylineLength = (ymaps, pointA, pointB) => {
    if (ymaps && pointA && pointB) {
      return ymaps.coordSystem.geo.getDistance(pointA, pointB); // Returns distance in meters
    }
    return 0;
  };

  function onClose(round) {
    setNotifications((prevState) =>
      prevState.filter((notification) => notification.round !== round)
    );
  }

  const finishTemplate = ymaps?.templateLayoutFactory?.createClass(
    `<div style="position: relative; width: 40px; height: 40px;">
      <img src=${finishImg} style="width: 100%; height: 100%;" />
    </div>`
  );

  const handleMapLoad = (ymaps) => {
    ymaps.originalEvent?.target?.cursors.push("arrow");
    return false;
  };

  const handleSubmit = () => {
    if (currentRound > MAX_ROUNDS - 1) {
      setIsGameEnded(true);
    }

    if (currentCoords) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      setPlacemarks((prevState) => [...prevState, currentPlacemark]);
      setCurrentPlacemark([]);

      // Добавление новой линии
      const newPolyline = [panoramaCoordsReversed, currentCoords];
      const length = calculatePolylineLength(
        ymaps,
        panoramaCoordsReversed,
        currentCoords
      );

      const roundData = {
        round: count,
        userCoords: currentCoords,
        panoramaCoords: panoramaCoordsReversed,
        length: Math.floor(length),
      };

      socket.emit("roundComplete", roundData);

      if (mapRef.current) {
        mapRef.current.panTo(panoramaCoordsReversed);
      }

      setPolylines((prevState) => [...prevState, newPolyline]);
      setPolylineLengths((prevState) => [
        ...prevState,
        {
          round: count,
          length: Math.floor(length),
          grade: evaluateDistance(length),
        },
      ]);
      setNotifications((prevState) => [
        ...prevState,
        { round: count, length: Math.floor(length) },
      ]);

      // Уникальные конечные точки
      setFinishes((prevState) =>
        prevState.includes(panoramaCoordsReversed)
          ? prevState
          : [...prevState, panoramaCoordsReversed]
      );

      setIsPinPlaced(false);
      setCount((prevState) => prevState + 1);

      dispatch(addRound());

      setPanoramaKey((prevKey) => prevKey + 1);
    } else {
      console.warn("Current coordinates are not set!");
    }
  };
  const onPlaceGuess = (coords) => {
    setCurrentCoords(coords);
    setCurrentPlacemark([{ coords, round: count }]);
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

  useEffect(() => {
    setIsLoading(true); // Устанавливаем загрузку в true
    const timer = setTimeout(() => {
      setIsLoading(false); // Через 2 секунды устанавливаем загрузку в false
    }, 2000);

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (polylineLengths.length > 0) {
      // Суммируем все значения grade
      const sum = polylineLengths.reduce((acc, item) => acc + item.grade, 0);
      // Вычисляем среднее арифметическое
      const average = sum / polylineLengths.length;
      // Округляем до одного знака после запятой и обновляем состояние
      setGrade(average.toFixed(1));
    }
  }, [polylineLengths]);

  useEffect(() => {
    if (count > totalRounds - 1) {
      dispatch(setGameEnd());
    }
  }, [count]);

  return (
    <div>
      {isGameEnded && <EndGameComponent average={grade} />}
      {isLoading && <LoaderComponent />}
      {!isGameEnded && (
        <UpHUDComponent
          MAX_ROUNDS={totalRounds ? totalRounds : 0}
          time={time ? time : 0}
          map="Минск"
          grade={grade}
          round={count}
          count={count}
          user1={userName}
          user2="no"
        />
      )}

      <div className={isGameEnded ? `endGameContainer` : `container`}>
        {!isGameEnded && (
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
        )}
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
              instanceRef={(ref) => {
                if (ref) mapRef.current = ref;
              }}
              onLoad={(e) => handleMapLoad(e)}
              className={`${mapClass} custom-cursor ${
                isGameEnded && endGameClass
              }`}
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
                          `<div style="position: relative; width: 40px; height: 40px;">
                          <img src=${pinImg} style="width: 100%; height: 100%;" />
                          <div style="position: absolute; top: 33%; left: 53%; transform: translate(-50%, -50%); color: black; font-size: 12px; font-weight: bold;">
                            ${el.round}
                          </div>
                        </div>`
                        ), // Use a proper fallback
                        iconImageHref: pinImg, // Fallback to an image directly if needed
                        iconOffset: [-20, -37],
                      }}
                    />
                  );
                })}
              {memoizedPlacemarks.length > 0 &&
                memoizedPlacemarks.flat().map((el, index) => (
                  <Placemark
                    geometry={el.coords}
                    key={index}
                    options={{
                      iconLayout: ymaps?.templateLayoutFactory?.createClass(
                        `<div style="position: relative; width: 40px; height: 40px;">
                          <img src=${pinImg} style="width: 100%; height: 100%;" />
                          <div style="position: absolute; top: 33%; left: 53%; transform: translate(-50%, -50%); color: black; font-size: 12px; font-weight: bold;">
                            ${el.round}
                          </div>
                        </div>`
                      ), // Use a proper fallback
                      iconImageHref: pinImg, // Fallback to an image directly if needed
                      iconOffset: [-21, -37],
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
                        iconOffset: [-19, -38],
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
                        strokeWidth: 2,
                        strokeOpacity: 0.8,
                      }}
                    />
                  );
                })}
              <FullscreenControl onMouseMove={handleMouseEnter} />
            </Map>
          </div>
        </YMaps>

        {!isGameEnded && (
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
        )}
      </div>

      <MemoizedPanoramaComponent
        key={panoramaKey}
        coords={propsPanoramaCoords}
      />

      <div className="notificationContainer">
        {notifications.length > 0 &&
          notifications.map((el, index) => {
            return (
              <Notification
                key={index}
                distance={el.length}
                onClose={() => onClose(el.round)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MapComponent;
