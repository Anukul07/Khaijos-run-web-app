import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../../styles/homepageMap.css";
import startIconImg from "../../assets/Map/start-line.png";
import endIconImg from "../../assets/Map/finish-line.png";
import "../../styles/homepageMap.css";

export default function HomepageMap({ routePath, startCoords, endCoords }) {
  const startIcon = L.icon({
    iconUrl: startIconImg,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const endIcon = L.icon({
    iconUrl: endIconImg,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const FitMapToRoute = () => {
    const map = useMap();

    if (!map || (!routePath?.length && !startCoords && !endCoords)) return null;

    const bounds = [];

    if (startCoords) bounds.push(startCoords);
    if (endCoords) bounds.push(endCoords);
    if (routePath && routePath.length > 0) bounds.push(...routePath);

    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return null;
  };

  return (
    <div className="homepage-map-wrapper">
      <MapContainer
        center={startCoords || [27.7, 85.3]}
        zoom={13}
        scrollWheelZoom={false}
        className="homepage-leaflet-map"
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          attribution="&copy; Stadia Maps &copy; OSM"
        />
        <FitMapToRoute />

        {startCoords && <Marker position={startCoords} icon={startIcon} />}
        {endCoords && <Marker position={endCoords} icon={endIcon} />}
        {routePath?.length > 0 && (
          <Polyline positions={routePath} color="white" />
        )}
      </MapContainer>
    </div>
  );
}
