import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Markdown from "react-native-markdown-display";
import { useBooks } from "../context/BookContext";
import backIcon from "./../assets/images/back.png";
import notificationIcon from "./../assets/images/notification.png";

const ReadChapter = ({ route, navigation }) => {
  const { bookDetails } = useBooks();
  const { chapterId } = route.params;
  const [chapterContent, setChapterContent] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");

  useEffect(() => {
    const chapter = bookDetails?.chapters.find(
      (chapter) => chapter._id === chapterId
    );
    setChapterContent(chapter?.content);
    setChapterTitle(chapter?.title);
  }, [chapterId, bookDetails]);

  const markdownStyles = {
    body: {
      fontSize: 28,
    },
    h1: {
      fontSize: 36,
    },
    h2: {
      fontSize: 32,
    },
    h3: {
      fontSize: 28,
    },
    h4: {
      fontSize: 24,
    },
    h5: {
      fontSize: 20,
    },
    h6: {
      fontSize: 16,
    },
  };

  return (
    <View className="bg-[#fbf7ef] flex-1 pt-12 px-6">
      {/* Header */}
      <View className="flex-row justify-between items-center py-4">
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={backIcon} />
        </Pressable>
        <Image source={notificationIcon} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <View className="p-2 mb-6">
          {/* <Text className="text-3xl font-bold text-[#3a3967] text-center mb-6">
            Currently Reading: {bookDetails?.title}
          </Text> */}
          <Text className="text-3xl font-bold text-[#3a3967] text-center mb-2">
            {chapterTitle}
          </Text>
          <Markdown
            className="text-base font-medium text-gray-600 text-center"
            style={{ body: { fontSize: 28 } }}
          >
            {chapterContent}
          </Markdown>
        </View>
      </ScrollView>
      <View className="mb-6 items-center">
        {/* Floating Buttons and icons to increase fontsize, change theme, etc */}
        <View className="w-auto bg-[#FBBC05] shadow-lg p-2 rounded-full flex-row justify-center">
          <TouchableOpacity className="p-3 bg-[#fbf7ef] rounded-full w-12 h-12 items-center mx-4">
            <Text className="text-xl font-bold">-</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-3 bg-[#fbf7ef] rounded-full w-12 h-12 items-center mx-4">
            <Text className="text-xl font-bold">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReadChapter;
