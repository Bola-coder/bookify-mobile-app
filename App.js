// import "./gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, Modal, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import MainNavigation from "./navigations/MainNavigation";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import BookProvider from "./context/BookContext";
import AuthProvider from "./context/AuthContext";
import CollectionProvider from "./context/CollectionContext";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [loaded, error] = useFonts({
    Georiga: require("./assets/fonts/georgia.ttf"),
    "Georgia-Bold": require("./assets/fonts/georgiab.ttf"),
    "Georgia-Italic": require("./assets/fonts/georgiai.ttf"),
  });

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    const unsusscribe = NetInfo.addEventListener((state) => {
      // console.log(state);
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        ShowConnetionStatus();
      }
      return () => {
        unsusscribe();
      };
    });
  }, []);

  const ShowConnetionStatus = () => {
    <Modal transparent={true} visible={!isConnected} animationType="slide">
      <View className="flex-1 justify-end items-center bg-black/50">
        <View className="w-full p-4 bg-red-600 items-center rounded-t-lg">
          <Text className="text-white font-bold text-lg">You are offline</Text>
          <TouchableOpacity className="mt-2 bg-white py-2 px-4 rounded-full">
            <Text className="text-red-600 font-semibold">Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>;
  };

  return (
    <View style={styles.container}>
      <RootSiblingParent>
        <NavigationContainer>
          <AuthProvider>
            <BookProvider>
              <CollectionProvider>
                <StatusBar style="auto" />
                <MainNavigation />
              </CollectionProvider>
            </BookProvider>
          </AuthProvider>
        </NavigationContainer>
      </RootSiblingParent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbf7ef",
  },
});
