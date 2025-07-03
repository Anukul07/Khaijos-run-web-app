import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "../../styles/map.css";
import { reverseGeocode } from "../../utils/reverseGeocode";
// import { getRoutePath } from "../../utils/getRoutePath";
import { getRoutePath2 } from "../../utils/getRoutePath2";
// import { getRoutePathWithFallback } from "../../utils/getRoutePathWithFallback";
import startIconImg from "../../assets/Map/start-line.png";
import endIconImg from "../../assets/Map/finish-line.png";

export default function Map({
  activeSelection,
  setActiveSelection,
  setStartCoords,
  setEndCoords,
  startCoords,
  endCoords,
  setDistance,
  setStartAddress,
  setEndAddress,
  setRoutePath,
  routePath,
}) {
  const startIcon = L.icon({
    iconUrl: startIconImg,
    iconSize: [40, 40], // adjust as needed
    iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
  });

  const endIcon = L.icon({
    iconUrl: endIconImg,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    const coords = [lat, lng];

    const locationName = await reverseGeocode(lat, lng);

    if (activeSelection === "start") {
      setStartCoords(coords);
      setStartAddress(locationName);
      setActiveSelection(null);
    } else if (activeSelection === "end") {
      setEndCoords(coords);
      setEndAddress(locationName);
      setActiveSelection(null);
    }
  };

  useEffect(() => {
    const fetchRoute = async () => {
      if (startCoords && endCoords) {
        const { geoCoords, distanceKm } = await getRoutePath2(
          startCoords,
          endCoords
        );
        setRoutePath(geoCoords);
        setDistance(distanceKm);
      }
    };

    fetchRoute();
  }, [startCoords, endCoords]);

  const MapClickHandler = () => {
    useMapEvents({ click: handleMapClick });
    return null;
  };

  return (
    <div className={`leaflet-map-container ${activeSelection ? "active" : ""}`}>
      <div className="top-prompt">
        {activeSelection && (
          <p>Please select your {activeSelection} location</p>
        )}
      </div>
      <div className="map-box">
        <MapContainer
          center={[27.7, 85.3]}
          zoom={13}
          scrollWheelZoom={false}
          className="leaflet-map"
        >
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            attribution="&copy; Stadia Maps &copy; OSM"
          />

          <MapClickHandler />
          {startCoords && <Marker position={startCoords} icon={startIcon} />}
          {endCoords && <Marker position={endCoords} icon={endIcon} />}
          {routePath.length > 0 && (
            <Polyline positions={routePath} color="white" />
          )}
        </MapContainer>
      </div>
    </div>
  );
}
