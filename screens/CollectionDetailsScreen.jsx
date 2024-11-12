import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useCollections } from "../context/CollectionContext";
import BookmarkCard from "../components/BookmarkCard";
import backIcon from "./../assets/images/back.png";
import notificationIcon from "./../assets/images/notification.png";

const CollectionDetailsScreen = ({ route, navigation }) => {
  const { collectionDetails, loading, getCollectionDetails } = useCollections();
  const { collectionId } = route.params;
  useEffect(() => {
    getCollectionDetails(collectionId);
  }, [collectionId]);

  return (
    <View className="bg-[#fbf7ef] flex-1 pt-10 px-5">
      {/* Header */}
      <View className="flex-row justify-between items-center py-4 border-b-2 border-neutral-300">
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={backIcon} />
        </Pressable>
        <Image source={notificationIcon} />
      </View>

      <ScrollView className="mt-8" showsVerticalScrollIndicator={false}>
        <Text className="text-3xl text-black font-bold">
          Books in {collectionDetails?.title}
        </Text>

        {loading && (
          <View className="flex-1 items-center justify-center mt-6">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading...</Text>
          </View>
        )}

        {/* Display the colletion titles and descriptions */}
        <View className="mt-5">
          {collectionDetails?.books?.map((collection) => (
            <BookmarkCard key={collection._id} book={collection} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CollectionDetailsScreen;
