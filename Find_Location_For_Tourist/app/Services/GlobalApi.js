import { supabase } from "../../lib/supabase";

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
      .ilike("title", `%${query}%`); // Case-insensitive search
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error searching locations:", err.message);
    return [];
  }
}



