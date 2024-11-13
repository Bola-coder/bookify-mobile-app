import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuthorContext } from "../context/AuthorContext";
import TabScreenHeader from "../components/TabScreenHeader";
import WriteNewBookModal from "../components/WriteNewBookModal";

const WriteScreen = ({ navigation }) => {
  const {
    loading,
    error,
    authorsBooks,
    drafts,
    getAllBooksFromAuthor,
    createNewBook,
  } = useAuthorContext();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAllBooksFromAuthor();
  }, []);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleCreateNewBook = (bookData) => {
    createNewBook(bookData);
    setModalVisible(false);
  };
  return (
    <ScrollView
      className="bg-[#f2e9d3] flex-1 pt-10 px-5"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      {/* Header */}
      <TabScreenHeader title="Write" />

      <TouchableOpacity
        className="mt-4 flex-row items-center"
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="note-plus" size={20} color="#000000" />
        <View className="ml-2">
          <Text className="text-xl font-bold">Write a new story</Text>
        </View>
      </TouchableOpacity>
      <View className="mt-6">
        {/* Drafts */}
        <View className="mb-8">
          <Text className="text-2xl font-bold">Your Drafts</Text>
          {loading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#000000" />
              <Text>Loading...</Text>
            </View>
          ) : error ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-lg text-red-600 font-bold">{error}</Text>
            </View>
          ) : authorsBooks.length === 0 ? (
            <View>
              <Text className="text-lg text-gray-600">No books found</Text>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {drafts.map((book) => (
                <TouchableOpacity
                  key={book._id}
                  className="flex-row mt-4 mb-2 basis-[100%] px-4 py-2 rounded-lg"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 4,
                  }}
                >
                  <View className="w-[100px] h-[100px] rounded-lg bg-neutral-200">
                    <Image
                      source={{ uri: book?.coverImage }}
                      className="w-[100px] h-[100px] rounded-lg"
                    />
                  </View>
                  <View className="flex-1 ml-4">
                    <Text className="text-lg font-bold">{book.title}</Text>
                    <Text className="text-lg text-gray-600">
                      {book.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
        {/* Published Books */}
        <View>
          <Text className="text-2xl font-bold">Your Books</Text>
          {loading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#000000" />
              <Text>Loading...</Text>
            </View>
          ) : error ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-lg text-red-600 font-bold">{error}</Text>
            </View>
          ) : authorsBooks.length === 0 ? (
            <View>
              <Text className="text-lg text-gray-600">No books found</Text>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {authorsBooks.map((book) => (
                <TouchableOpacity
                  key={book._id}
                  className="flex-row mt-4 mb-2 basis-[100%] px-4 py-2 rounded-lg"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 4,
                  }}
                >
                  <View className="w-[100px] h-[100px] rounded-lg bg-neutral-200">
                    <Image
                      source={{ uri: book?.coverImage }}
                      className="w-[100px] h-[100px] rounded-lg"
                    />
                  </View>
                  <View className="flex-1 ml-4">
                    <Text className="text-lg font-bold">{book.title}</Text>
                    <Text className="text-lg text-gray-600">
                      {book.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </View>

      <WriteNewBookModal
        modalVisible={modalVisible}
        onClose={handleModalClose}
        handleSubmit={handleCreateNewBook}
      />
    </ScrollView>
  );
};

export default WriteScreen;

const styles = StyleSheet.create({});
