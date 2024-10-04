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
        navigation.navigate("BookDetailsScreen", { bookId: book?.title });
      }}
      className="w-[200px]"
    >
      {/* Container for the image and absolute-positioned tag */}
      <View className="relative">
        <Image
          className="w-[100%] rounded-lg"
          source={{
            uri: book?.cover_id
              ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
              : Image.resolveAssetSource(bookOneImage).uri, // Fallback image
          }}
          style={{ width: "100%", height: 200, borderRadius: 10 }}
        />
        <Text className="bg-[#FBBC05] text-black text-xl font-bold px-2 py-1 absolute top-2 right-2 rounded">
          Fiction
        </Text>
      </View>
      {/* Content below the image */}
      <View className="py-2">
        <Text className="text-lg text-black font-bold">{book?.title}</Text>
        <Text className="text-md text-neutral-500 font-medium">
          {book?.authors?.map((author) => author.name).join(", ")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;
