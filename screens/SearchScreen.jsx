import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import backIcon from "./../assets/images/back.png";
import notificationIcon from "./../assets/images/notification.png";
import searchIcon from "./../assets/images/search.png";
import SearchResultCard from "../components/SearchResultCard";

const SearchScreen = () => {
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

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Input */}
        <View className="mt-5">
          <Text className="text-3xl text-black font-bold">Search</Text>
          <Text className="text-xl text-neutral-500 font-normal">
            Search for your favorite books
          </Text>
          <View className="flex-row items-center mt-5 border-2 border-neutral-200 rounded-lg">
            <TextInput
              placeholder="Search for books"
              className="flex-1 text-lg px-3 py-4"
            />
            <Image source={searchIcon} className="mr-3" />
          </View>
        </View>

        {/* Search Result */}
        <View className="mt-8">
          <Text className="text-3xl text-black font-bold">Search Result</Text>
          <Text className="text-xl text-neutral-500 font-normal">
            Showing results for "Harry Potter"
          </Text>
          {/* Search Result Card */}
          <View className="mt-4">
            <SearchResultCard />
            <SearchResultCard />
            <SearchResultCard />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
