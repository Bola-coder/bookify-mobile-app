import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Markdown from "react-native-markdown-display";
import { TabView, TabBar } from "react-native-tab-view";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useBooks } from "../context/BookContext";
import backIcon from "./../assets/images/back.png";
import notificationIcon from "./../assets/images/notification.png";

const ReadChapter = ({ route, navigation }) => {
  const { bookDetails } = useBooks();
  const chapterId = route.params.chapterId;
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const layout = useWindowDimensions();
  const initialLayout = {
    width: layout.width || 400,
    height: layout.height || 800,
  };

  useEffect(() => {
    if (bookDetails?.chapters) {
      const chapterRoutes = bookDetails.chapters.map((chapter) => ({
        key: chapter._id,
        title: chapter.title,
      }));
      setRoutes(chapterRoutes);
      const initialIndex = chapterRoutes.findIndex(
        (route) => route.key === chapterId
      );
      setIndex(initialIndex !== -1 ? initialIndex : 0);
    }
  }, [bookDetails, chapterId]);

  const [fontSizes, setFontSizes] = useState({
    body: 18,
    heading1: 32,
    heading2: 28,
    heading3: 24,
    heading4: 20,
    paragraph: 18,
    listItemText: 18,
    blockquote: 18,
  });

  const increaseFontSize = () => {
    setFontSizes((prev) => ({
      body: prev.body <= 22 ? prev.body + 2 : prev.body,
      heading1: prev.heading1 < 40 ? prev.heading1 + 4 : prev.heading1,
      heading2: prev.heading2 < 36 ? prev.heading2 + 4 : prev.heading2,
      heading3: prev.heading3 < 32 ? prev.heading3 + 4 : prev.heading3,
      heading4: prev.heading4 < 28 ? prev.heading4 + 4 : prev.heading4,
      paragraph: prev.paragraph < 22 ? prev.paragraph + 2 : prev.paragraph,
      listItemText:
        prev.listItemText < 22 ? prev.listItemText + 2 : prev.listItemText,
      blockquote: prev.blockquote < 22 ? prev.blockquote + 2 : prev.blockquote,
    }));
  };

  const decreaseFontSize = () => {
    setFontSizes((prev) => ({
      body: prev.body >= 14 ? prev.body - 2 : prev.body,
      heading1: prev.heading1 > 24 ? prev.heading1 - 4 : prev.heading1,
      heading2: prev.heading2 > 20 ? prev.heading2 - 4 : prev.heading2,
      heading3: prev.heading3 > 20 ? prev.heading3 - 4 : prev.heading3,
      heading4: prev.heading4 > 20 ? prev.heading4 - 4 : prev.heading4,
      paragraph: prev.paragraph > 14 ? prev.paragraph - 2 : prev.paragraph,
      listItemText:
        prev.listItemText > 14 ? prev.listItemText - 2 : prev.listItemText,
      blockquote: prev.blockquote > 14 ? prev.blockquote - 2 : prev.blockquote,
    }));
  };
  const markdownStyles = StyleSheet.create({
    body: { fontSize: fontSizes.body, color: "#3a3967", lineHeight: 28 },
    heading1: {
      fontSize: fontSizes.heading1,
      fontWeight: "bold",
      color: "#3a3967",
      marginBottom: 10,
    },
    heading2: {
      fontSize: fontSizes.heading2,
      fontWeight: "bold",
      color: "#3a3967",
      marginBottom: 8,
    },
    heading3: {
      fontSize: fontSizes.heading3,
      fontWeight: "bold",
      color: "#3a3967",
      marginBottom: 6,
    },
    heading4: {
      fontSize: fontSizes.heading4,
      fontWeight: "bold",
      color: "#3a3967",
      marginBottom: 6,
    },
    paragraph: {
      fontSize: fontSizes.paragraph,
      color: "#3a3967",
      textAlign: "justify",
      marginBottom: 8,
    },
    listItemText: { fontSize: fontSizes.listItemText, color: "#3a3967" },
    blockquote: {
      fontSize: fontSizes.blockquote,
      color: "#FBBC05",
      fontStyle: "italic",
      paddingLeft: 10,
      borderLeftWidth: 4,
      borderLeftColor: "#FBBC05",
      marginBottom: 8,
    },
  });

  // The chapter content
  const renderScene = ({ route }) => {
    const chapter = bookDetails?.chapters.find(
      (chapter) => chapter._id === route.key
    );
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <View className="p-2 mb-6">
          <Text className="text-3xl font-bold text-[#3a3967] text-center mb-2">
            {chapter?.title}
          </Text>
          <Markdown style={markdownStyles}>{chapter?.content}</Markdown>
        </View>
      </ScrollView>
    );
  };

  return (
    <View className="bg-[#f2e9d3] flex-1 pt-12 px-6">
      {/* Header */}
      <View className="flex-row justify-between items-center py-4">
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={backIcon} />
        </Pressable>
        <Image source={notificationIcon} />
      </View>

      {/* Rendering the chapters as swipable tab views */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={() => null}
        initialLayout={initialLayout}
      />

      {/* Floating Buttons and icons to increase fontsize, change theme, etc */}
      <View className="mb-6 items-center">
        <View className="w-auto bg-[#FBBC05] shadow-lg p-2 rounded-full flex-row justify-center">
          <TouchableOpacity
            className="p-2 bg-[#fbf7ef] rounded-full w-10 h-10 items-center mx-4"
            onPress={decreaseFontSize}
          >
            <Text className="text-base font-bold">
              <Icon name="minus" size={20} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 bg-[#fbf7ef] rounded-full w-10 h-10 items-center mx-4"
            onPress={increaseFontSize}
          >
            <Text className="text-base font-bold">
              <Icon name="plus" size={20} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReadChapter;
