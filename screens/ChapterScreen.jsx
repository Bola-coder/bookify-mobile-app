import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useBooks } from "../context/BookContext";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

const ChapterScreen = ({ navigation }) => {
  const { bookDetails } = useBooks();

  return (
    <View className="bg-[#f2e9d3] flex-1 pt-12 px-6">
      {/* Header */}
      <Header title="Book Chapters" />

      {/* Book Title and Description */}
      <View className="p-4 mb-6">
        <Text className="text-3xl font-bold text-[#]3a3967] text-center mb-2">
          {bookDetails?.title}
        </Text>
        <Text className="text-base font-medium text-gray-600 text-center">
          {bookDetails?.description}
        </Text>
      </View>

      {/* Chapter List Heading */}
      <View className="mb-4">
        <Text className="text-2xl font-semibold text-[#3a3967] text-center">
          Chapters
        </Text>
      </View>

      {/* Chapters List */}
      <FlatList
        data={bookDetails?.chapters}
        renderItem={({ item }) => <Chapter chapter={item} />}
        keyExtractor={(chapter) => chapter._id}
        contentContainerStyle="space-y-4"
      />
    </View>
  );
};

export default ChapterScreen;

const Chapter = ({ chapter }) => {
  const navigation = useNavigation();
  const readChapter = () => {
    navigation.navigate("ReadChapterScreen", {
      chapterId: chapter._id,
    });
  };
  return (
    <TouchableOpacity
      className="bg-[#FBBC05] rounded-lg p-4 shadow-sm border border-gray-200 mb-2"
      activeOpacity={0.7}
      onPress={readChapter}
    >
      <Text className="text-xl font-semibold text-[#3a3967] mb-1">
        {chapter.title}
      </Text>
    </TouchableOpacity>
  );
};
