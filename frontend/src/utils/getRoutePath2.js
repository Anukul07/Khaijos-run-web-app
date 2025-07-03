import axios from "axios";
import polyline from "@mapbox/polyline"; // npm install @mapbox/polyline

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYW51a3VsMDAiLCJhIjoiY21jbmVjZ2liMHBhYjJqc2QwMXV1MmZyMiJ9.VGQQts0xtZqmL3cOftRyaQ";

export const getRoutePath2 = async (startCoords, endCoords) => {
  const start = `${startCoords[1]},${startCoords[0]}`;
  const end = `${endCoords[1]},${endCoords[0]}`;

  try {
    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${start};${end}?geometries=polyline&overview=full&access_token=${MAPBOX_TOKEN}`
    );

    const decoded = polyline.decode(response.data.routes[0].geometry);
    const geoCoords = decoded.map(([lat, lng]) => [lat, lng]);
    const distanceKm = response.data.routes[0].distance / 1000;

    return { geoCoords, distanceKm: distanceKm.toFixed(2) };
  } catch (error) {
    console.error("Mapbox failed:", error.message);
    throw error;
  }
};
