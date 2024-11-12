import {
  Alert,
  FlatList,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import StarReview from "react-native-stars";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Toast from "react-native-root-toast";
import { useBooks } from "../context/BookContext";
import { useCollections } from "../context/CollectionContext";
import { useAuth } from "../context/AuthContext";
import bookImagePlaceholder from "./../assets/images/bookImagePlaceholder.jpg";
import backIcon from "./../assets/images/back.png";
import notificationIcon from "./../assets/images/notification.png";

const BookDetails = ({ route }) => {
  const navigation = useNavigation();
  const bookId = route.params.bookId;
  const { bookDetails, likeMessage, getBookDetails, likeBook, unlikeBook } =
    useBooks();
  const {
    collections,
    collectionError,
    getAllCollections,
    addBookToCollection,
  } = useCollections();
  const { user } = useAuth();
  const [bookLiked, setBookLiked] = useState(false);
  const [collectionWithTheBook, setCollectionWithTheBook] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getBookDetails(bookId);
    getAllCollections();
  }, [bookId]);

  useEffect(() => {
    checkIfBookIsLiked();
  }, [bookDetails]);

  useEffect(() => {
    checkIfBookIsInACollectionForUser();
  }, [collections]);
  const checkIfBookIsLiked = () => {
    setBookLiked(false);
    const userLiked = bookDetails?.likes?.findIndex(
      (like) => like._id === user._id
    );

    if (userLiked !== -1) {
      setBookLiked(true);
    }
  };

  const checkIfBookIsInACollectionForUser = () => {
    const bookInColletions = collections.filter((collection) => {
      const bookIndex = collection.books.findIndex(
        (book) => book._id === bookId
      );
      return bookIndex !== -1;
    });

    setCollectionWithTheBook(bookInColletions);
    // console.log("Book in collections", bookInColletions);
  };

  const handleBookLike = async () => {
    if (bookLiked) {
      Alert.alert("Unlike Book", "Are you sure you want to unlike this book?", [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            await unlikeBook(bookId);
            // Toast.show(likeMessage, {
            //   duration: Toast.durations.SHORT,
            //   position: Toast.positions.TOP,
            //   animation: true,
            //   hideOnPress: true,
            // });
          },
        },
      ]);
    } else {
      await likeBook(bookId);
      // Toast.show(likeMessage, {
      //   duration: Toast.durations.SHORT,
      //   position: Toast.positions.TOP,
      //   animation: true,
      //   hideOnPress: true,
      // });
    }
  };

  const handleAddToCollection = async (collectionId) => {
    await addBookToCollection(collectionId, bookId);
    setModalVisible(false);
  };

  const handleReadBook = () => {
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
                : Image.resolveAssetSource(bookImagePlaceholder).uri,
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
            <Text className="text-2xl text-black font-bold">
              {bookDetails?.likes?.length}
            </Text>
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

        {/* Displays Tags  */}
        <View className="mt-5 mb-6">
          <Text
            className="text-2xl text-[#3a3967] py-3"
            style={{ fontFamily: "Georgia-Bold" }}
          >
            Tags
          </Text>
          <View className="flex-row">
            {bookDetails?.tags?.map((tag, index) => (
              <View
                key={index}
                className="bg-[#f1f1f1] py-2 px-4 rounded-full mr-2"
              >
                <Text className="text-lg text-black font-normal">{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Implement like and unlike book */}
        <View className="flex-row  items-center mt-5 mb-6">
          <TouchableOpacity className="mr-5 px-2" onPress={handleBookLike}>
            <Icon
              name={bookLiked ? "thumb-up" : "thumb-up-outline"}
              size={36}
              color="black"
            />
            {/* <Text className="text-black text-2xl font-bold ml-2">Like</Text> */}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Buttons for Read and Save */}
      <View className="flex-row justify-between mb-10">
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          className="bg-white py-3 border-2 rounded-full basis-[45%] flex-row items-center justify-center"
        >
          <Icon
            name="bookmark-outline"
            size={24}
            color="black"
            style={{
              marginRight: 5,
            }}
          />
          <Text className="text-black text-center text-2xl font-bold">
            Save
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleReadBook}
          className="bg-black py-3 border-2 rounded-full basis-[45%]"
        >
          <Text className="text-white text-center text-2xl font-bold">
            Read now
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray bg-opacity-50">
          <View
            className="bg-white rounded-lg w-[90%] max-h-[50%] p-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <Text className="text-2xl font-bold mb-4 text-center">
              Add to Collection
            </Text>
            <FlatList
              data={collections}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleAddToCollection(item._id)}
                  className="py-3 px-4 bg-gray-200 rounded-lg my-2"
                >
                  {
                    <Icon
                      name={
                        collectionWithTheBook &&
                        collectionWithTheBook.findIndex(
                          (collection) => collection._id === item._id
                        ) !== -1
                          ? "bookmark"
                          : "bookmark-outline"
                      }
                      size={24}
                      color="black"
                      style={{
                        position: "absolute",
                        right: 10,
                        top: 10,
                      }}
                    />
                  }
                  <Text className="text-xl text-center">{item.title}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-4 py-3 px-4 bg-red-500 rounded-lg"
            >
              <Text className="text-white text-center text-lg">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BookDetails;
