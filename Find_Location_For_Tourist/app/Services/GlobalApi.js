import { supabase } from "../../lib/supabase";
import axios from 'axios';

export async function fetchLocations(category) {
  try {
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .eq("category", category);
    if (error) throw error;
    console.log(data);
    return data;
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
  const accessToken = "pk.eyJ1Ijoia2hhbmcxNDEyMDMiLCJhIjoiY20zdDltNHZvMDd3MjJsc2ZsZmVzOXZlZCJ9.DZj1STnMXQgd_ftwT88I1Q";

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


