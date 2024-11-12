import axios from "axios";

const BASE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const API_KEY = "AIzaSyAlIDUiTW6M9p6qb7mHsMCvqk0_OMO3MV0"; // Thay YOUR_API_KEY bằng API key của bạn

// Hàm tìm các địa điểm gần đây
const nearByPlace = async (latitude, longitude, radius = 1500, type = 'restaurant') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        location: `${latitude},${longitude}`, // Vị trí hiện tại (latitude, longitude)
        radius: radius,                        // Bán kính tìm kiếm, đơn vị là mét
        type: type,                            // Loại địa điểm (có thể là 'restaurant', 'hotel', 'gas_station', ...)
        key: API_KEY                           // API Key
      }
    });
    
    // Trả về danh sách các địa điểm gần đây
    return response.data.results;
  } catch (error) {
    console.error("Error fetching nearby places:", error);
    throw error;
  }
};

export default nearByPlace;
