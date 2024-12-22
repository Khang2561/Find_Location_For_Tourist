import { supabase } from '../../lib/supabase';

// Function to fetch user session and profile
export const fetchUserSession = async () => {
  try {
    const session = await supabase.auth.getSession();
    return session?.data?.session?.user || null;
  } catch (error) {
    console.error('Error fetching user session:', error.message);
    return null;
  }
};

// Function to fetch user profile details
export const fetchUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    return null;
  }
};

export const uploadProfilePicture = async (userId, file) => {
  try {
    // Generate a unique file name
    const fileName = `${userId}-${Date.now()}.${file.name.split('.').pop()}`;

    const { data, error } = await supabase.storage
      .from('profile-pictures')
      .upload(fileName, file);

    if (error) throw error;

    // Get the public URL of the uploaded image
    const { publicUrl } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(fileName);

    // Update the user's profile picture in the database
    const { error: updateError } = await supabase
      .from('user')
      .update({ pPicture: publicUrl })
      .eq('id', userId);

    if (updateError) throw updateError;

    return publicUrl;
  } catch (error) {
    console.error('Error uploading profile picture:', error.message);
    return null;
  }
};

// Fetch reviews for a specific place
export const fetchReviews = async (locationID) => {
  try {
    if (!locationID) {
      console.error("fetchReviews Error: locationID is undefined or invalid");
      return [];
    }

    const { data, error } = await supabase
      .from("rating")
      .select(`
        rating, 
        comment, 
        created_at, 
        userID,
        user: user (username)  
      `)
      .eq("locationID", locationID)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data.map((review) => ({
      ...review,
      username: review.user?.username || "Anonymous", // Extract username
    }));
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    return [];
  }
};

// Add a new review
export const addReview = async (locationID, userID, rating, comment) => {
  try {
    // Check if the user has already reviewed this location
    const { data: existingReview, error: fetchError } = await supabase
      .from("rating")
      .select("*")
      .eq("locationID", locationID)
      .eq("userID", userID)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") { // Ignore "No rows found" error
      throw fetchError;
    }

    if (existingReview) {
      return { error: "Bạn đã đánh giá địa điểm này trước đó." };
    }

    // Add the new review
    const { data, error } = await supabase
      .from("rating")
      .insert([{ locationID, userID, rating, comment }]);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding review:", error.message);
    return { error: error.message };
  }
};

// Add a place to favorites
export const addToFavorites = async (userID, locationID) => {
  try {
    const { data: existingFavorite, error: fetchError } = await supabase
      .from("favorites")
      .select("*")
      .eq("userID", userID)
      .eq("locationID", locationID)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    if (existingFavorite) {
      return { error: "Địa điểm đã có trong danh sách yêu thích." };
    }

    const { data, error } = await supabase
      .from("favorites")
      .insert([{ userID, locationID }]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding to favorites:", error.message);
    return { error: error.message };
  }
};

// Fetch the list of favorite places for the user
export const fetchFavorites = async (userID) => {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .select(`
        id, 
        location: locations (id, latitude, longitude, title, address, imageUrl, totalScore)
      `)
      .eq("userID", userID);

    if (error) throw error;

    // Filter out entries where location is null
    return data
      .filter((fav) => fav.location !== null)
      .map((fav) => fav.location); // Map to location details
  } catch (error) {
    console.error("Error fetching favorites:", error.message);
    return [];
  }
};

// Check if a location is favorited by the user
export const isLocationFavorited = async (userId, locationId) => {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("userID", userId)
      .eq("locationID", locationId)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return !!data; // Return true if the location is favorited, false otherwise
  } catch (error) {
    console.error("Error checking favorite status:", error.message);
    return false;
  }
}

// Remove a location from the user's favorites
export const removeFromFavorites = async (userId, locationId) => {
  try {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("userID", userId)
      .eq("locationID", locationId);

    if (error) throw error;
    return true; // Indicate success
  } catch (error) {
    console.error("Error removing from favorites:", error.message);
    return false;
  }
};

