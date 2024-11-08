import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useBooks } from "../context/BookContext";
import menuIcon from "./../assets/images/menu.png";
import notificationIcon from "./../assets/images/notification.png";
import BookCard from "../components/BookCard";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { books, getAllBooks } = useBooks();
  useEffect(() => {
    getAllBooks();
  }, []);

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
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.openDrawer()}
        >
          <Image source={menuIcon} />
        </TouchableOpacity>
        <Text className="text-2xl text-green-700 font-bold">Bookify</Text>
        <Image source={notificationIcon} />
      </View>

      {/* Recommended Books */}
      <View className="mt-5">
        <Text className="text-3xl text-black font-bold">
          Recommended for you
        </Text>
        <Text className="text-xl text-neutral-500 font-normal">
          Some great books you might like
        </Text>
        <ScrollView
          horizontal
          className="mt-4"
          contentContainerStyle={{}}
          showsHorizontalScrollIndicator={false}
        >
          {books &&
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
