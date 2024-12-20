import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const BookCard = ({ book }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate("BookDetailsScreen", { bookId: book._id });
      }}
      className="w-[180px] h-[300px] rounded-lg shadow-md"
    >
      {/* Container for the image and absolute-positioned tag */}
      <View className="relative">
        <Image
          className="w-[100%] rounded-lg"
          source={{
            uri: book?.coverImage,
          }}
          style={{ width: "100%", height: 200, borderRadius: 10 }}
        />
        <Text className="bg-[#FBBC05] text-black text-lg font-bold px-2 py-1 absolute top-2 right-2 rounded">
          {book.genres[0] ? book.genres[0] : "Fiction"}
        </Text>
      </View>
      {/* Content below the image */}
      <View className="p-2 px-4">
        <Text className="text-md text-black font-bold">
          {book.title.length > 20
            ? `${book.title.slice(0, 20)}...`
            : book.title}
        </Text>
        {/* <Text className="text-md text-gray-600 py-1">
          {book.description.length > 20
            ? `${book.description.slice(0, 20)}...`
            : book.description}
        </Text> */}
        <Text className="text-sm text-neutral-800 font-medium py-1">
          {book?.author.firstname + " " + book?.author.lastname}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;
