import axios from "axios";
import AsyncStorage from "../utils/AsyncStorage";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AsyncStorage.getData("token")}`,
  },
});

export default axiosInstance;
