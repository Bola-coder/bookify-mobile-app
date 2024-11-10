import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        drawerActiveTintColor: "#03560f",
        drawerInactiveTintColor: "black",
        drawerActiveBackgroundColor: "lightgrey",
        drawerInactiveBackgroundColor: "#fbf7ef",
        drawerLabelStyle: {
          fontSize: 20,
          fontWeight: "bold",
        },
        drawerStyle: {
          backgroundColor: "#fbf7ef",
        },
      })}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
