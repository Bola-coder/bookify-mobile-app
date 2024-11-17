import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useCollections } from "../context/CollectionContext";
import BookmarkCard from "../components/BookmarkCard";
import Header from "../components/Header";

const CollectionDetailsScreen = ({ route, navigation }) => {
  const { collectionDetails, loading, getCollectionDetails, emptyCollection } =
    useCollections();
  const { collectionId } = route.params;
  useEffect(() => {
    getCollectionDetails(collectionId);
  }, [collectionId]);

  const handleEmptyCollection = () => {
    Alert.alert(
      "Empty Collection",
      "Are you sure you want to empty this collection?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => emptyCollection(collectionDetails._id),
        },
      ]
    );
  };

  return (
    <View className="bg-[#f2e9d3] flex-1 pt-10 px-5">
      {/* Header */}
      <Header title="Collection Details" />

      <ScrollView className="mt-8" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl text-black font-bold">
            Books in {collectionDetails?.title}
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={handleEmptyCollection}>
            <Icon name="delete" size={24} color="#FF6347" />
          </TouchableOpacity>
        </View>

        {loading && (
          <View className="flex-1 items-center justify-center mt-6">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
          </View>
        )}

        {/* Display the colletion titles and descriptions */}
        <View className="mt-5">
          {collectionDetails?.books?.length !== 0 ? (
            collectionDetails?.books?.map((collection) => (
              <BookmarkCard key={collection._id} book={collection} />
            ))
          ) : (
            <View className="flex-1 items-center justify-center mt-6">
              <Text className="text-base text-black">
                No books found in this collection.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CollectionDetailsScreen;
