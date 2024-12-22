import { supabase } from "../../lib/supabase";
import axios from 'axios';

export const MAPBOX_TOKEN = "pk.eyJ1Ijoia2hhbmcxNDEyMDMiLCJhIjoiY20zdDltNHZvMDd3MjJsc2ZsZmVzOXZlZCJ9.DZj1STnMXQgd_ftwT88I1Q"

export async function fetchLocations(category, userLocation) {
  try {
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .eq("category", category);
    if (error) throw error;

    // Calculate distance from user location
    const locationsWithDistance = data.map(location => ({
      ...location,
      distance: getDistanceFromLatLonInKm(
        userLocation.latitude,
        userLocation.longitude,
        location.latitude,
        location.longitude
      )
    }));

    // Sort by distance and take the nearest 20
    locationsWithDistance.sort((a, b) => a.distance - b.distance);
    const nearestLocations = locationsWithDistance.slice(0, 20);

    return nearestLocations;
  } catch (err) {
    console.error("Error fetching locations:", err.message);
    return [];
  }
}

export async function searchLocations(query) {
  try {
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .ilike("title", `%${query}%`); 
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error searching locations:", err.message);
    return [];
  }
}

export async function fetchDirections(start, end) {
  const baseUrl = `https://api.mapbox.com/directions/v5/mapbox/driving`;
  const accessToken = MAPBOX_TOKEN;

  try {
    const response = await axios.get(`${baseUrl}/${start.longitude},${start.latitude};${end.longitude},${end.latitude}`, {
      params: {
        geometries: "geojson", // Get GeoJSON for rendering
        access_token: accessToken,
      },
    });

    if (response.data.routes.length) {
      return response.data.routes[0].geometry;
    } else {
      throw new Error("No route found");
    }
  } catch (error) {
    console.error("Error fetching directions:", error.message);
    return null;
  }
};

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers

  // Convert degrees to radians
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate distance
  return R * c;
}
