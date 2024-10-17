// import "./gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./navigations/MainNavigation";
import BookProvider from "./context/BookContext";
import AuthProvider from "./context/AuthContext";

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <AuthProvider>
          <BookProvider>
            <StatusBar style="auto" />
            <MainNavigation />
          </BookProvider>
        </AuthProvider>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
