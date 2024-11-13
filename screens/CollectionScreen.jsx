import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useCollections } from "../context/CollectionContext";
import Header from "../components/Header";
import TabScreenHeader from "../components/TabScreenHeader";

const CollectionScreen = () => {
  const {
    collections,
    loading,
    getAllCollections,
    createCollection,
    deleteCollection,
  } = useCollections();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getAllCollections();
  }, []);

  const navigation = useNavigation();

  const handleViewCollection = (id) => {
    navigation.navigate("CollectionDetailsScreen", { collectionId: id });
  };

  const handleCreateCollection = () => {
    if (title && description) {
      createCollection({ title, description });
      setModalVisible(false);
      setTitle("");
      setDescription("");
    }
  };

  const handleDeleteCollection = (id) => {
    Alert.alert(
      "Delete Collection",
      "Are you sure you want to delete this collection?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteCollection(id),
        },
      ]
    );
  };

  return (
    <View className="bg-[#f2e9d3] flex-1 pt-10 px-5">
      {/* Header */}
      <TabScreenHeader title="Collections" />

      <ScrollView className="mt-8" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center">
          <Text className="text-3xl text-black font-bold">My Collections</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="plus-circle" size={30} color="#000" />
          </TouchableOpacity>
        </View>
        {loading && (
          <View className="flex-1 items-center justify-center mt-6">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
          </View>
        )}
        {/* Display the collection titles and descriptions */}
        <View className="mt-5">
          {collections.map((collection) => (
            <TouchableOpacity
              key={collection._id}
              activeOpacity={0.7}
              className="mt-5 bg-[#FBBC05] p-4 rounded-lg shadow-md"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
              }}
              onPress={() => handleViewCollection(collection._id)}
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-lg text-black font-bold">
                    {collection.title} ({collection.books.length})
                  </Text>
                  <Text className="text-md text-neutral-500 font-normal mt-1">
                    {collection.description}
                  </Text>
                </View>
                {collection.deletable && (
                  <TouchableOpacity
                    className=""
                    activeOpacity={0.7}
                    onPress={() => handleDeleteCollection(collection._id)}
                  >
                    <Icon name="delete" size={24} color="#000" />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modal for creating a new collection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-grey-500 bg-opacity-50">
          <View
            className="w-11/12 bg-[#fbf7ef] p-5 rounded-lg shadow-2xl"
            style={{
              elevation: 4,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
          >
            {/* Modal Header with Close Icon */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-2xl font-bold">Create New Collection</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Input Fields */}
            <Text className="text-lg font-semibold">Title</Text>
            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              className="border border-gray-300 p-3 rounded-lg mb-4"
            />
            <Text className="text-lg font-semibold">Description</Text>
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              className="border border-gray-300 p-3 rounded-lg mb-4"
              multiline
            />

            {/* Create Button */}
            <TouchableOpacity
              onPress={handleCreateCollection}
              className="bg-[#FBBC05] p-4 rounded-lg items-center"
              activeOpacity={0.7}
            >
              <Text className="text-white text-lg font-bold">
                Create Collection
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CollectionScreen;
