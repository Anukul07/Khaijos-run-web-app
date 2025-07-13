import axios from "axios";

const ORS_API_KEY = "#";

export const getRoutePath = async (startCoords, endCoords) => {
  const body = {
    coordinates: [
      [startCoords[1], startCoords[0]], // ORS expects [lng, lat]
      [endCoords[1], endCoords[0]],
    ],
  };

  try {
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/foot-walking/geojson",
      body,
      {
        headers: {
          Authorization: ORS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const geoCoords = response.data.features[0].geometry.coordinates.map(
      ([lng, lat]) => [lat, lng]
    );
    const distanceKm =
      response.data.features[0].properties.summary.distance / 1000;

    return { geoCoords, distanceKm: distanceKm.toFixed(2) };
  } catch (error) {
    console.error("Failed to fetch route path:", error);
    return { geoCoords: [], distanceKm: 0 };
  }
};
