import React, { useEffect, useRef, useState } from "react";
import { Panorama } from "@pbe/react-yandex-maps";
import { getRandomCoords } from "../utils/getRandomCoords";

const PanoramaComponent: React.FC = () => {
  const panoramaRef = useRef<any>(null); // Adjust the type as per the actual type returned by Panorama

  const [currentCoords, setCurrentCoords] = useState<number[]>([]);

  function updateCurrentCoords(ref: any) {
    if (ref && ref.getPanorama()) {
      const panorama = ref?.getPanorama();
      const coords = panorama?.getPosition(); // Assuming getPosition() returns [longitude, latitude]
      const firstCoords = [coords[0], coords[1]]
      setCurrentCoords(firstCoords);
      console.log("Current coordinates updated:", firstCoords);
    }
  }

  const eventsProvider = (ref: any) => {
    if (ref) {
      panoramaRef.current = ref;
  

      // Add the "markerexpand" event listener
      ref.events.add("markerexpand", (event: any) => {
        event.preventDefault();
      });

      ref.events.add("panoramachange", (event: any) => {
        updateCurrentCoords(ref);
      });

      console.log("Default markerexpand reaction prevented.");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Select the parent elements
      const parentElement = document.querySelector(
        "#root > div > div:nth-child(4) > ymaps:nth-child(1) > ymaps > ymaps.ymaps-2-1-79-panorama-control__top-right"
      ) as HTMLElement | null;

      const parentElement2 = document.querySelector(
        "#root > div > div:nth-child(4) > ymaps:nth-child(1) > ymaps > ymaps.ymaps-2-1-79-panorama-control__copyright"
      ) as HTMLElement | null;

      // If the parent elements are found, remove all their children
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
    }, 100); // Checks every 100ms to remove the children

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId as NodeJS.Timeout); // Type assertion for compatibility
  }, []);

  return (
    <Panorama
      instanceRef={eventsProvider}
      options={{
        hotkeysEnabled: true,
        suppressMapOpenBlock: true,
        controls: ["panoramaName"],
        autoFitToViewport: "always",
      }}
      width="100vw"
      height="100vh"
      defaultPoint={getRandomCoords()}
    />
  );
};

export default PanoramaComponent;
