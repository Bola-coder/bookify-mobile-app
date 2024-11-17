import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import TabNavigation from "./TabNavigation";
import BookDetails from "../screens/BookDetails";
import ChapterScreen from "../screens/ChapterScreen";
import ReadChapter from "../screens/ReadChapter";
import CollectionDetailsScreen from "../screens/CollectionDetailsScreen";
import ContinueWritingScreen from "../screens/ContinueWritingScreen";

const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookDetailsScreen"
        component={BookDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChaptersScreen"
        component={ChapterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReadChapterScreen"
        component={ReadChapter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CollectionDetailsScreen"
        component={CollectionDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContinueWritingScreen"
        component={ContinueWritingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tab"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
