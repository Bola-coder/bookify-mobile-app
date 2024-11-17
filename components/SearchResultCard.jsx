import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SearchResultCard = ({ book }) => {
  console.log(book);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="flex-row items-center border-b-2 border-neutral-200 py-4"
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate("BookDetailsScreen", { bookId: book._id });
      }}
    >
      <View className="w-[100px] h-[100px] rounded-lg bg-neutral-200">
        <Image
          className="w-[100%] rounded-lg"
          source={{ uri: book?.coverImage }}
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
        />
      </View>
      {/* Title and summary */}
      <View className="flex-1 ml-4">
        <Text className="text-lg text-black font-bold">
          {book?.title.length > 25
            ? `${book.title.slice(0, 25)}...`
            : book.title}
        </Text>
        <Text className="text-md text-neutral-500 font-normal">
          {book?.description.length > 40
            ? `${book.description.slice(0, 40)}...`
            : book.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResultCard;
