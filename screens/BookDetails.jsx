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

  // console.log("Book Details", bookDetails);
  console.log("Book Details", bookDetails?.title);
  console.log("Book descr: ", bookDetails?.author_name);
  console.log("E-book URL: ", bookDetails?.ebook_access);

  // Get description safely in case it's an object
  const getDescription = () => {
    if (!bookDetails?.description) return "No description available.";
    return typeof bookDetails.description === "string"
      ? bookDetails.description
      : bookDetails.description.value;
  };

  // Fallback image URL for Open Library covers
  const getImageSource = () => {
    if (bookDetails?.covers && bookDetails.covers.length > 0) {
      return {
        uri: `https://covers.openlibrary.org/b/id/${bookDetails.covers[0]}-L.jpg`,
      };
    } else if (bookDetails?.formats?.["image/jpeg"]) {
      return { uri: bookDetails.formats["image/jpeg"] };
    }
    return bookOneImage; // Local fallback image
  };

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
        <View className="max-w-[90%] w-auto mt-6">
          <Image
            source={getImageSource()}
            className="w-full h-[300px] rounded-lg self-center"
            resizeMode="cover"
          />
        </View>

        {/* Title and Summary */}
        <View className="mt-5 border-b-2 pb-3 border-neutral-200">
          <Text className="text-2xl text-black font-bold">
            {bookDetails?.title || "No title available"}
          </Text>
          <Text className="text-lg text-[#0D0842] font-bold">
            {bookDetails?.authors?.map((author) => author.name).join(", ") ||
              "Unknown Author"}
          </Text>
          {/* Replace with actual summary from API if available */}
          <Text className="text-lg text-neutral-400 font-normal">
            {getDescription()}
          </Text>
        </View>

        {/* Overview */}
        <View className="mt-5">
          <Text className="text-2xl text-black font-bold">Overview</Text>
          <Text className="text-lg text-neutral-500 font-normal">
            {/* Use a portion of the description as an overview or additional data if available */}
            {getDescription()}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookDetails;
