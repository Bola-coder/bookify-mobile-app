import { View, Text, Image } from "react-native";
import React from "react";
import bookmarkIcon from "./../assets/images/bookmark.png";

const BookmarkCard = ({ book }) => {
  return (
    <View className="flex-row items-center border-b-2 border-neutral-200 py-4">
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
          <Image source={bookmarkIcon} className="w-6 h-6 ml-2" />
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
    </View>
  );
};

export default BookmarkCard;
