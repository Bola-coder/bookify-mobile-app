import { Image, ScrollView, Text, View } from "react-native";
import React from "react";
import menuIcon from "./../assets/images/menu.png";
import notificationIcon from "./../assets/images/notification.png";
import BookCard from "../components/BookCard";

const HomeScreen = () => {
  return (
    <ScrollView
      className="bg-white flex-1 pt-10 px-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center py-4 border-b-2 border-neutral-300">
        <Image source={menuIcon} />
        <Text className="text-2xl text-green-700 font-bold">Bookify</Text>
        <Image source={notificationIcon} />
      </View>
      {/* Recommended Books */}
      <View className="mt-5">
        <Text className="text-3xl text-black font-bold">
          Recommended for you
        </Text>
        <Text className="text-xl text-neutral-500 font-normal">
          Handpicked based on your reading preferences.
        </Text>
        <ScrollView
          horizontal
          className="mt-4"
          contentContainerStyle={{}}
          showsHorizontalScrollIndicator={false}
        >
          <View className="mr-5">
            <BookCard />
          </View>
          <View className="mr-5">
            <BookCard />
          </View>
          <View className="mr-5">
            <BookCard />
          </View>
        </ScrollView>
      </View>

      <View className="mt-5">
        <Text className="text-3xl text-black font-bold">New Releases</Text>
        <Text className="text-xl text-neutral-500 font-normal">
          Newly released books spanning various genres.
        </Text>
        <ScrollView
          horizontal
          className="mt-4"
          contentContainerStyle={{}}
          showsHorizontalScrollIndicator={false}
        >
          <View className="mr-5">
            <BookCard />
          </View>
          <View className="mr-5">
            <BookCard />
          </View>
          <View className="mr-5">
            <BookCard />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
