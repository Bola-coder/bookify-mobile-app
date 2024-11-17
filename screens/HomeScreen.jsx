import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useBooks } from "../context/BookContext";

import BookCard from "../components/BookCard";
import TabScreenHeader from "../components/TabScreenHeader";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { books, loading, getAllBooks } = useBooks();
  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <ScrollView
      className="bg-[#f2e9d3] flex-1 pt-10 px-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      {/* Header */}
      <TabScreenHeader title="Books" />

      {/* Recommended Books */}
      <View className="mt-5">
        <Text
          className="text-2xl text-black "
          style={{ fontFamily: "Georgia-Bold" }}
        >
          Recommended for you
        </Text>
        <Text className="text-lg text-neutral-500 font-normal">
          Some great books you might like
        </Text>
        <ScrollView
          horizontal
          className="mt-4"
          contentContainerStyle={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
        >
          {loading && (
            <View className="flex-1 items-center justify-center mt-6">
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Loading...</Text>
            </View>
          )}
          {!loading &&
            books &&
            books.map((book) => (
              <View className="mr-5" key={book._id}>
                <BookCard book={book} />
              </View>
            ))}
        </ScrollView>
      </View>

      {/* <View className="mt-5">
        <Text className="text-3xl text-black font-bold">Science Books</Text>
        <Text className="text-xl text-neutral-500 font-normal">
          Explore the world of science
        </Text>
        <ScrollView
          horizontal
          className="mt-4"
          contentContainerStyle={{}}
          showsHorizontalScrollIndicator={false}
        >
          {scienceBooks &&
            scienceBooks.map((book) => (
              <View className="mr-5" key={book.key}>
                <BookCard book={book} />
              </View>
            ))}
        </ScrollView>
      </View> */}

      {/* Inspirationa Books */}
      {/* <View className="mt-5">
        <Text className="text-3xl text-black font-bold">
          Inspirational Books
        </Text>
        <Text className="text-xl text-neutral-500 font-normal">
          Books that inspire you to be the best version of yourself
        </Text>
        <ScrollView
          horizontal
          className="mt-4"
          contentContainerStyle={{}}
          showsHorizontalScrollIndicator={false}
        >
          {inspirationalBooks &&
            inspirationalBooks.map((book) => (
              <View className="mr-5" key={book.key}>
                <BookCard book={book} />
              </View>
            ))}
        </ScrollView>
      </View> */}
    </ScrollView>
  );
};

export default HomeScreen;
