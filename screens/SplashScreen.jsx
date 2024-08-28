import { Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import logo from "./../assets/images/logo.png";

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("RegisterScreen");
    }, 2000);
  }, []);
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
