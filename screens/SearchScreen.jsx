import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import backIcon from "./../assets/images/back.png";
import notificationIcon from "./../assets/images/notification.png";
import searchIcon from "./../assets/images/search.png";
import SearchResultCard from "../components/SearchResultCard";
import { useBooks } from "../context/BookContext";

const SearchScreen = () => {
  const {
    loading,
    searchResults,
    searchMessage,
    setSearchResults,
    searchBooks,
  } = useBooks();
  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    setSearchResults([]);
  }, []);
  const handleSearch = (query) => {
    console.log(query);
    if (query.length <= 0) {
      console.log("Please enter a search query");
      return;
    }
    searchBooks(query);
  };
  const navigation = useNavigation();
  return (
    <View className="bg-[#fbf7ef] flex-1 pt-10 px-5">
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
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              onSubmitEditing={() => handleSearch(searchQuery)}
            />
            <Image source={searchIcon} className="mr-3" />
          </View>
        </View>

        {loading ? (
          <View className="items-center justify-center mt-12">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
          </View>
        ) : (
          <View className="mt-8">
            <Text className="text-3xl text-black font-bold">Search Result</Text>
            <Text className="text-xl text-neutral-500 font-normal">
              Showing results for "{searchQuery}"
            </Text>
            {/* Search Result Card */}
            <View className="mt-4">
              {searchResults.length > 0 ? (
                searchResults.map((book) => (
                  <SearchResultCard key={book._id} book={book} />
                ))
              ) : (
                <Text>{searchMessage}</Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
