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
