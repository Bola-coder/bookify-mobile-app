import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import bookOneImage from "./../assets/images/bookOne.png";

const BookCard = ({ book }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate("BookDetailsScreen", { bookId: book._id });
      }}
      className="w-[200px]"
    >
      {/* Container for the image and absolute-positioned tag */}
      <View className="relative">
        <Image
          className="w-[100%] rounded-lg"
          source={{
            uri: book?.coverImage
              ? book.coverImage
              : Image.resolveAssetSource(bookOneImage).uri, // Fallback image
          }}
          style={{ width: "100%", height: 200, borderRadius: 10 }}
        />
        <Text className="bg-[#FBBC05] text-black text-xl font-bold px-2 py-1 absolute top-2 right-2 rounded">
          {book.genres[0] ? book.genres[0] : "Fiction"}
        </Text>
      </View>
      {/* Content below the image */}
      <View className="py-2">
        <Text className="text-2xl text-black font-bold">{book?.title}</Text>
        <Text className="text-lg text-gray-600">
          {book.description.length > 25
            ? `${book.description.slice(0, 25)}...`
            : book.description}
        </Text>
        <Text className="text-md text-neutral-800 font-medium">
          {book?.author.firstname + " " + book?.author.lastname}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;
