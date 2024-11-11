import axios from "axios";
import AsyncStorage from "../utils/AsyncStorage";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set up a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Retrieve the token from AsyncStorage
    let token = await AsyncStorage.getData("token");
    token = token ? JSON.parse(token) : null;

    if (token) {
      // Set the Authorization header with the token if it exists
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
