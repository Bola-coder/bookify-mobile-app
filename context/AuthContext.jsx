/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "./../config/axios";
import AsyncStorage from "../utils/AsyncStorage";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  const handleError = (error) => {
    if (error.response) {
      console.log("Response Data:", error.response.data);
      console.log("Response Status:", error.response.status);
      console.log("Response Headers:", error.response.headers);
    } else if (error.request) {
      console.log("Request Data:", error.request);
    } else {
      console.log("Error Message:", error.message);
    }
  };

  // effects
  useEffect(() => {
    const checkAuth = async () => {
      const userData = await AsyncStorage.getObjectData("user");
      const token = await AsyncStorage.getData("token");
      if (userData) {
        setUser(userData);
      }

      checkAuthStatus();
    };
    checkAuth();
  }, []);

  const register = async (data) => {
    setLoading(true);
    axios
      .post(`${apiUrl}/auth/register`, data)
      .then(async (res) => {
        await AsyncStorage.storeData("token", res.data.token);
        await AsyncStorage.storeData("user", res.data.data.user);
        setUser(res.data.data);
        setIsAuthenticated(true);
        navigate("Tab");
      })
      .catch((error) => {
        handleError(error);
      })
      .finally(() => setLoading(false));
  };

  // Login
  const login = async (data) => {
    setLoading(true);
    axios
      .post(`${apiUrl}/auth/login`, data)
      .then(async (res) => {
        // console.log("Response data in login function", res.data);
        await AsyncStorage.storeData("token", res.data.token);
        await AsyncStorage.storeData("user", res.data.data.user);
        setUser(res.data.data);
        setIsAuthenticated(true);
        navigate("Tab");
      })
      .catch((error) => {
        console.log("Error in login function", error);
        handleError(error);
      })
      .finally(() => setLoading(false));
  };

  // Check auth status
  const checkAuthStatus = async () => {
    axiosInstance
      .get("/auth/check-auth")
      .then((res) => {
        if (res.data.status === "success") {
          setIsAuthenticated(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAuthenticated(false);
      });
  };

  const values = {
    loading,
    isAuthenticated,
    user,
    register,
    login,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
