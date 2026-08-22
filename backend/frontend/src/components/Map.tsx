"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon issue with Webpack
const customIcon = L.divIcon({
  className: "custom-map-marker",
  html: `<div style="background-color: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); transition: transform 0.2s;"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

interface MapProps {
  markers?: Array<{
    id: string;
    lat: number;
    lng: number;
    label: string;
  }>;
  center?: [number, number];
  zoom?: number;
}

export default function Map({ markers = [], center = [20, 0], zoom = 2 }: MapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-full w-full bg-slate-100 animate-pulse rounded-[2rem]" />;

  return (
    <div className="w-full h-full relative rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] z-0">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: "100%", width: "100%" }}
        zoomControl={false} // We can disable the default zoom control for a cleaner look or move it
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={customIcon}>
            <Popup className="custom-popup">
              <div className="font-bold text-slate-800 text-sm">{marker.label}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
