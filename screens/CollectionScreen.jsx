import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import BookmarkCard from "../components/BookmarkCard";
import backIcon from "./../assets/images/back.png";
import notificationIcon from "./../assets/images/notification.png";

const CollectionScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="bg-white flex-1 pt-10 px-5">
      {/* Header */}
      <View className="flex-row justify-between items-center py-4 border-b-2 border-neutral-300">
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={backIcon} />
        </Pressable>
        <Image source={notificationIcon} />
      </View>

      <ScrollView className="mt-8" showsVerticalScrollIndicator={false}>
        <Text className="text-3xl text-black font-bold">My Collections</Text>
        <View>
          <BookmarkCard />
          <BookmarkCard />
          <BookmarkCard />
          <BookmarkCard />
          <BookmarkCard />
          <BookmarkCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default CollectionScreen;
