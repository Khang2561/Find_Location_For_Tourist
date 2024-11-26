import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nttyqqrzkqrffzhybfph.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50dHlxcXJ6a3FyZmZ6aHliZnBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MjAzMzEsImV4cCI6MjA0ODE5NjMzMX0.ztk1qew8nMwpOAWvwB-xrOcTvgpcZv1IFtPriJ7mrto'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,  
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

// Hàm kiểm tra kết nối đến Supabase
async function checkSupabaseConnection() {
    try {
      const { error } = await supabase.from('locations').select('*').limit(1)
      if (error) throw error
      console.log("Kết nối Supabase thành công!")
    } catch (error) {
      console.error("Lỗi kết nối đến Supabase:", error.message)
    }
  }
  
  // Gọi hàm kiểm tra kết nối khi ứng dụng khởi động
  checkSupabaseConnection()

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})