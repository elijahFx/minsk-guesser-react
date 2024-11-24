import React, { useEffect, useRef, useState } from "react";
import { Panorama } from "@pbe/react-yandex-maps";

export default function PanoramaComponent() {
  const panoramaRef = useRef(null);

  const [sw, setSW] = useState(false);

  function handleClick() {
    console.log("клик");
    
    setSW(!sw)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Select the parent element
      const parentElement = document.querySelector(
        "#root > div > div:nth-child(4) > ymaps:nth-child(1) > ymaps > ymaps.ymaps-2-1-79-panorama-control__top-right"
      );

      // If the parent element is found, remove all its children
      if (parentElement) {
        while (parentElement.firstChild) {
          parentElement.removeChild(parentElement.firstChild);
        }
        console.log("All children removed");
      }
    }, 100); // Checks every 10ms to remove the children

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (panoramaRef.current) {
      console.log(panoramaRef.current);
      panoramaRef.current.events.add("markerexpand", () => {
        console.log("Нажали");
      });
    }
  }, [sw]);

  return (
    <Panorama
      onClick={() => handleClick}
      instanceRef={panoramaRef}
      options={{
        hotkeysEnabled: true,
        suppressMapOpenBlock: true,
        controls: ["panoramaName"],
      }}
      width="100vw"
      height="100vh"
      defaultPoint={[53.908393, 27.558943]}
    ></Panorama>
  );
}
