import { Text, View, Image } from "react-native";
import React, { useEffect } from "react";
const { useAuth } = require("../context/AuthContext");
import { useNavigation } from "@react-navigation/native";
import logo from "./../assets/images/logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    async function clearAsyncStorage() {
      await AsyncStorage.clear();
    }

    clearAsyncStorage();
    const timeout = setTimeout(() => {
      if (isAuthenticated) {
        navigation.navigate("Tab");
      } else {
        navigation.navigate("LoginScreen");
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isAuthenticated]);
  return (
    <View className="bg-white flex-1 pt-10 justify-center items-center">
      <View className="justify-center items-center flex-row">
        <Image source={logo} className="mr-3" />
        <Text className="text-green-600 text-[50px] font-bold">Bookify</Text>
      </View>
    </View>
  );
};

export default SplashScreen;
