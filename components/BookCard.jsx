import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import bookOneImage from "./../assets/images/bookOne.png";

const BookCard = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate("BookDetailsScreen");
      }}
      className="w-[200px]"
    >
      {/* Container for the image and absolute-positioned tag */}
      <View className="relative">
        <Image source={bookOneImage} className="w-[100%] rounded-lg" />
        <Text className="bg-[#FBBC05] text-black text-xl font-bold px-2 py-1 absolute top-2 right-2 rounded">
          Fiction
        </Text>
      </View>
      {/* Content below the image */}
      <View className="py-2">
        <Text className="text-lg text-black font-bold">
          I want a better catastrophe
        </Text>
        <Text className="text-md text-neutral-500 font-medium">
          With global warming projected to rocket past the...
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;
