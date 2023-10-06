"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import { ReactNode } from "react";
import ReactMapGL from "react-map-gl";

type Props = {
  children?: ReactNode;
};

export default function MapView({ children }: Props) {
  return (
    <ReactMapGL
      mapLib={import("mapbox-gl")}
      mapboxAccessToken="pk.eyJ1IjoiaXRzbWVsZW9uYXJkbyIsImEiOiJja3ZzcmpoMTU0czBtMm9tbHZhbTMzYTFrIn0.fgwmkMuUlIaqcnXtQjbWfQ"
      mapStyle="mapbox://styles/mapbox/light-v11"
      initialViewState={{
        longitude: -77.036526,
        latitude: -12.062106,
        zoom: 10,
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </ReactMapGL>
  );
}
