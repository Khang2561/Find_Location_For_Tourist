import { supabase } from '../../lib/supabase';

export const isLoggedIn = async () => {
  try {
    const session = await supabase.auth.getSession();
    return !!session?.data?.session?.user; // Returns true if user exists, otherwise false
  } catch (error) {
    console.error('Error checking login status:', error.message);
    return false;
  }
};

export const getLoggedInUser = async () => {
  try {
    const session = await supabase.auth.getSession();
    return session?.data?.session?.user || null;
  } catch (error) {
    console.error('Error fetching logged-in user:', error.message);
    return null;
  }
};

export const onAuthStateChange = (callback) => {
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      callback(!!session?.user); // Pass the login status (true/false) to the callback
    });
  
    // Ensure we return a valid unsubscribe function
    return () => {
      subscription?.unsubscribe?.(); // Use optional chaining to call unsubscribe if available
    };
  };
