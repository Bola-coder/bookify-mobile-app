// import "./gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./navigations/MainNavigation";
import BookProvider from "./context/BookContext";

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <BookProvider>
          <StatusBar style="auto" />
          <MainNavigation />
        </BookProvider>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
