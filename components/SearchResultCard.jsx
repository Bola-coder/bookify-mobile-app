import { View, Text } from "react-native";
import React from "react";

const SearchResultCard = () => {
  return (
    <View className="flex-row items-center border-b-2 border-neutral-200 py-4">
      <View className="w-[100px] h-[100px] rounded-lg bg-neutral-200"></View>
      {/* Title and summary */}
      <View className="flex-1 ml-4">
        <Text className="text-lg text-black font-bold">
          Harry Potter and the Philosopher's Stone
        </Text>
        <Text className="text-md text-neutral-500 font-normal">
          Harry Potter has never even heard of Hogwarts when the letters start
          dr
        </Text>
      </View>
    </View>
  );
};

export default SearchResultCard;
