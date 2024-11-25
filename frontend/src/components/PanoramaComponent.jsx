import React, { useEffect, useRef } from "react";
import { Panorama } from "@pbe/react-yandex-maps";
import { getRandomCoords } from "../utils/getRandomCoords";

export default function PanoramaComponent() {
  const panoramaRef = useRef(null);

  

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Select the parent element
      const parentElement = document.querySelector(
        "#root > div > div:nth-child(4) > ymaps:nth-child(1) > ymaps > ymaps.ymaps-2-1-79-panorama-control__top-right"
      );

      const parentElement2 = document.querySelector(
        "#root > div > div:nth-child(4) > ymaps:nth-child(1) > ymaps > ymaps.ymaps-2-1-79-panorama-control__copyright"
      );

      // If the parent element is found, remove all its children
      if (parentElement || parentElement2) {
        while (parentElement.firstChild && parentElement2.firstChild) {
          parentElement.removeChild(parentElement.firstChild);
          parentElement2.removeChild(parentElement2.firstChild);
        }
        console.log("All children removed");
      }
    }, 100); // Checks every 10ms to remove the children

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (panoramaRef.current) {
      
      panoramaRef.current.events.add("markerexpand", () => {
        return null
      });
      panoramaRef.current.events.add("markercollapse", () => {
        console.log("Нажали");
      });
      console.log(panoramaRef.current);
    }
  }, [panoramaRef]);

  return (
    <Panorama
      instanceRef={panoramaRef}
      
      options={{
        hotkeysEnabled: true,
        suppressMapOpenBlock: true,
        controls: ["panoramaName"],
      }}
      width="100vw"
      height="100vh"
      defaultPoint={getRandomCoords()}
    ></Panorama>
  );
}
