import axios from "axios";

const OPENCAGE_API_KEY = "#";

export const reverseGeocode = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API_KEY}`
    );
    const formatted = response.data.results[0]?.formatted;
    return formatted || "Unknown Location";
  } catch (err) {
    console.error("Reverse geocoding failed:", err);
    return "Unknown Location";
  }
};
