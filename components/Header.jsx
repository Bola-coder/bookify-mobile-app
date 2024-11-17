import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import backIcon from "./../assets/images/back.png";
// import notificationIcon from "./../assets/images/notification.png";

const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View className="flex-row items-center py-4 border-b-2 border-neutral-300">
      <Pressable onPress={() => navigation.goBack()}>
        <Image source={backIcon} />
      </Pressable>
      <View className="flex-1 items-center">
        <Text className="text-2xl text-[#000000] font-bold">{title}</Text>
      </View>
      {/* <Image source={notificationIcon} /> */}
    </View>
  );
};

export default Header;
