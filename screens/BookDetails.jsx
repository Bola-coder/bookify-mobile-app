import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useBooks } from "../context/BookContext";
import bookOneImage from "./../assets/images/bookOne.png";
import backIcon from "./../assets/images/back.png";
import notificationIcon from "./../assets/images/notification.png";

const BookDetails = ({ route }) => {
  const navigation = useNavigation();
  const bookId = route.params.bookId;
  console.log(bookId);
  const { bookDetails, getBookDetails } = useBooks();

  useEffect(() => {
    getBookDetails(bookId);
  }, [bookId]);

  console.log("Book Details", bookDetails);

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
        <View className="max-w-[100%] w-auto mt-6">
          <Image
            source={{
              uri: bookDetails?.coverImage
                ? bookDetails.coverImage
                : Image.resolveAssetSource(bookOneImage).uri,
            }}
            className="w-full h-[300px] rounded-lg self-center"
            resizeMode="cover"
          />
        </View>

        <View className="mt-5 border-b-2 pb-3 border-neutral-200">
          <Text className="text-4xl text-black font-bold mb-2">
            {bookDetails?.title}
          </Text>
          <Text className="text-lg text-neutral-400 font-normal mb-2">
            {bookDetails?.description}
          </Text>
          <Text className="text-lg text-[#0D0842] font-bold">
            Author:{" "}
            {bookDetails.author?.firstname + " " + bookDetails.author?.lastname}
          </Text>
        </View>

        <View className="mt-5">
          <Text className="text-2xl text-black font-bold">Overview</Text>
          <Text className="text-lg text-neutral-500 font-normal">
            {bookDetails?.summary}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookDetails;
