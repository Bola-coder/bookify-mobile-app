import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useCollections } from "../context/CollectionContext";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
const BookmarkCard = ({ book }) => {
  const navigation = useNavigation();
  const { collectionDetails, removeBookFromCollection } = useCollections();

  const handleRemoveBook = () => {
    Alert.alert(
      "Remove Book",
      "Are you sure you want to remove this book from the collection?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            removeBookFromCollection(collectionDetails._id, book._id),
        },
      ]
    );
  };
  return (
    <TouchableOpacity
      className="flex-row items-center bg-[#FBBC05] border-b-2 border-neutral-200 py-2 px-4 rounded-lg"
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("BookDetailsScreen", { bookId: book._id })
      }
    >
      {/* Placeholder for the book image */}
      <View className="w-[100px] h-[100px] rounded-lg bg-neutral-200">
        <Image
          source={{
            uri: book?.coverImage,
          }}
          className="w-[100px] h-[100px] rounded-lg"
        />
      </View>

      {/* Title, Author, Summary, and Bookmark Icon */}
      <View className="flex-1 ml-4">
        {/* Title and Bookmark Icon Container */}
        <View className="flex-row items-center justify-between">
          <Text className="text-lg text-black font-bold flex-1">
            {book?.title}
          </Text>
          <TouchableOpacity className="p-2" onPress={handleRemoveBook}>
            <Icon name="delete" size={24} color="#FF6347" />
          </TouchableOpacity>
        </View>

        {/* Author */}
        <Text className="text-md text-[#0D084] font-bold mt-1">
          {book?.auhtor}
        </Text>

        {/* Summary */}
        <Text className="text-md text-neutral-500 font-normal mt-1">
          {book?.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookmarkCard;
