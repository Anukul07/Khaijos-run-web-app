import { getRoutePath } from "./getRoutePath"; // ORS
import { getRoutePath2 } from "./getRoutePath2"; // Mapbox

export const getRoutePathWithFallback = async (startCoords, endCoords) => {
  try {
    return await getRoutePath(startCoords, endCoords);
  } catch (error) {
    console.warn("Falling back to Mapbox...");
    try {
      return await getRoutePath2(startCoords, endCoords);
    } catch (fallbackError) {
      console.error("Both routing services failed.");
      return { geoCoords: [], distanceKm: 0 };
    }
  }
};
