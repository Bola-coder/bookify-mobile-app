import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import StarReview from "react-native-stars";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useBooks } from "../context/BookContext";
import bookOneImage from "./../assets/images/bookOne.png";
import backIcon from "./../assets/images/back.png";
import notificationIcon from "./../assets/images/notification.png";

const BookDetails = ({ route }) => {
  const navigation = useNavigation();
  const bookId = route.params.bookId;
  const { bookDetails, getBookDetails } = useBooks();

  useEffect(() => {
    getBookDetails(bookId);
  }, [bookId]);

  // console.log("Book Details", bookDetails);

  const handleNextAction = () => {
    navigation.navigate("ChaptersScreen");
  };

  return (
    <View className="bg-[#fbf7ef] flex-1 pt-10 px-5">
      {/* Header */}
      <View className="flex-row justify-between items-center py-4">
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={backIcon} />
        </Pressable>
        <Image source={notificationIcon} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="max-w-[100%] w-auto mt-6">
          <Image
            source={{
              uri: bookDetails?.coverImage
                ? bookDetails.coverImage
                : Image.resolveAssetSource(bookOneImage).uri,
            }}
            className="w-[60%] h-[300px] rounded-lg self-center"
            resizeMode="cover"
          />
        </View>

        <View className="mt-5 pb-3 border-neutral-200 items-center">
          <Text
            className="text-4xl text-[#3a3967] mb-2 text-center"
            style={{ fontFamily: "Georgia-Bold" }}
          >
            {bookDetails?.title}
          </Text>
          <Text className="text-lg text-neutral-600 font-normal mb-1">
            {bookDetails.author?.firstname + " " + bookDetails.author?.lastname}
          </Text>
        </View>

        {/* Rating stars */}
        <View className="flex-row items-center justify-center">
          <StarReview
            default={4}
            count={5}
            half={true}
            starSize={50}
            disabled={true}
            fullStar={
              <Icon name="star" style={{ color: "#FFD700" }} size={30} />
            }
            emptyStar={
              <Icon
                name="star-outline"
                style={{ color: "#FFD700" }}
                size={30}
              />
            }
            halfStar={
              <Icon name="star-half" style={{ color: "#FFD700" }} size={30} />
            }
          />
        </View>

        {/* Stats like reads, likes, and reviews */}
        <View className="flex-row justify-between mt-5 w-[80%] self-center">
          <View className="flex items-center">
            <Text className="text-2xl text-black font-bold">+120</Text>
            <Text className="text-lg text-neutral-400 font-normal">
              Readers
            </Text>
          </View>

          <View className="flex items-center">
            <Text className="text-2xl text-black font-bold">80</Text>
            <Text className="text-lg text-neutral-400 font-normal">Likes</Text>
          </View>
          <View className="flex items-center">
            <Text className="text-2xl text-black font-bold">200</Text>
            <Text className="text-lg text-neutral-400 font-normal">
              Reviews
            </Text>
          </View>
        </View>

        {/* Overview */}
        <View className="mt-5">
          <Text
            className="text-2xl text-[#3a3967] py-3"
            style={{ fontFamily: "Georgia-Bold" }}
          >
            Overview
          </Text>
          <Text
            className="text-lg text-neutral-500 "
            style={{ fontFamily: "Georgia" }}
          >
            {bookDetails?.summary}
          </Text>
        </View>
      </ScrollView>
      <View className="flex-row justify-between mb-10">
        <TouchableOpacity
          onPress={() => {
            console.log("Bookmarking");
          }}
          className="bg-white py-3 border-2 rounded-full basis-[45%]"
        >
          <Text className="text-black text-center text-2xl font-bold">
            Save for later
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextAction}
          className="bg-black py-3 border-2 rounded-full basis-[45%]"
        >
          <Text className="text-white text-center text-2xl font-bold">
            Read now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookDetails;
