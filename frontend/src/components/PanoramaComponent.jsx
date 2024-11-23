import React from "react";
import MapComponent from "./MapComponent";
import { Panorama } from "@pbe/react-yandex-maps";

export default function PanoramaComponent() {
  return (
    <div className="panorama">
      <Panorama></Panorama>
      <MapComponent />
    </div>
  );
}
