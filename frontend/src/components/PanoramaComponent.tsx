import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Panorama, YMaps } from "@pbe/react-yandex-maps";
import { getRandomCoords } from "../utils/getRandomCoords";
import { useDispatch } from "react-redux";
import { setPanoramaCoords } from "../slices/coordinatesSlice";

interface PanoramaComponentProps {
  coords: number[]; 
}

const PanoramaComponent: React.FC<PanoramaComponentProps> = ({ coords }) => {
  const panoramaRef = useRef<any>(null); // Adjust the type as per the actual type returned by Panorama
  const [randomCoords, setRandomCoords] = useState<number[]>([]);
  const [isPanoramaAvailable, setIsPanoramaAvailable] = useState(false);

  console.log(`мы тут - ${coords}`);
  

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    setRandomCoords(getRandomCoords());
  }, []);

  function handleError(err: any) {
    console.error(err);
    //window.location.reload();
  }

  function updateCurrentCoords(ref: any) {
    if (ref && ref?.getPanorama()) {
      const panorama = ref?.getPanorama();
      const position = panorama?._position;
      const firstCoords = [position[0], position[1]];
      dispatch(setPanoramaCoords(firstCoords))
    }
  }

  const eventsProvider = (ref: any) => {
    if (ref) {
      panoramaRef.current = ref;
      updateCurrentCoords(ref);

      // Add the "markerexpand" event listener
      ref.events.add("markerexpand", (event: any) => {
        event.preventDefault();
      });

      ref.events.add("panoramachange", (event: any) => {
        updateCurrentCoords(ref);
        console.log("next");
      });

      ref.events.add("error", (event: any) => {
        console.log("ГЛЕБ, ПОСМОТРИ СЮДА");
      });

      console.log("Default markerexpand reaction prevented.");
    } else {
      setRandomCoords(getRandomCoords());
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const parentElement = document.querySelector(
        "#root > div > div:nth-child(4) > ymaps:nth-child(1) > ymaps > ymaps.ymaps-2-1-79-panorama-control__top-right"
      );

      const parentElement2 = document.querySelector(
        "#root > div > div:nth-child(4) > ymaps:nth-child(1) > ymaps > ymaps.ymaps-2-1-79-panorama-control__copyright"
      );

      if (parentElement || parentElement2) {
        if (parentElement) {
          while (parentElement.firstChild) {
            parentElement.removeChild(parentElement.firstChild);
          }
        }

        if (parentElement2) {
          while (parentElement2.firstChild) {
            parentElement2.removeChild(parentElement2.firstChild);
          }
        }

        console.log("All children removed");
      }
    }, 100);

    return () => {
      //@ts-ignore
      clearInterval(intervalId); // Ensure no type assertions here
    };
  }, []);

  useLayoutEffect(() => {
    const checkPanoramaAvailability = async (coords: number[]) => {
      try {
        const ymaps = await window.ymaps.ready(); // Ensure the Yandex Maps API is ready
        // @ts-ignore: error message
        const service = new ymaps.panorama.locate(coords);

        const panoramas = await service;
        if (panoramas && panoramas.length > 0) {
          setRandomCoords(coords);
          setIsPanoramaAvailable(true);
          console.warn(`Нашли панорамы: ${(panoramas)}`)
        } else {
          setIsPanoramaAvailable(false);
          console.warn("Не нашли панорамы")
          // Retry with new coordinates
          checkPanoramaAvailability(getRandomCoords());
         
        }
      } catch (err) {
        console.error("Error checking panorama availability:", err);
        setIsPanoramaAvailable(false);
        // Retry with new coordinates in case of an error
        checkPanoramaAvailability(getRandomCoords());
      }
    };

    // Start by checking for a panorama at randomly generated coordinates
    checkPanoramaAvailability(getRandomCoords());
  }, []);

  useEffect(() => {
    setRandomCoords(getRandomCoords());
  }, []);

  return (
    randomCoords && isPanoramaAvailable && (
      <YMaps
        query={{
          apikey: "b758d8a7-6b04-428a-8075-287f16ed6f8d&lang=ru_RU",
        }}
      >
        <Panorama
          onError={handleError}
          instanceRef={eventsProvider}
          options={{
            hotkeysEnabled: true,
            suppressMapOpenBlock: true,
            controls: ["panoramaName"],
            autoFitToViewport: "always",
          }}
          width="100vw"
          height="100vh"
          point={randomCoords}
        />
      </YMaps>
    )
  );
};

export default PanoramaComponent;