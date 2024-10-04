import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import CollectionScreen from "../screens/CollectionScreen";

// Icons
import IonIcons from "@expo/vector-icons/Ionicons";
import DrawerNavigation from "./DrawerNavigation";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let routeName = route.name;

          if (routeName == "Drawer") {
            iconName = focused ? "home" : "home-outline";
          } else if (routeName === "SearchScreen") {
            iconName = focused ? "search" : "search-outline";
          } else if (routeName === "CollectionScreen") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          } else if (routeName === "WriteScreen") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }

          return <IonIcons name={iconName} size={24} color={color} />;
        },
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 80,
          backgroundColor: "white",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#03560f",
      })}
    >
      <Tab.Screen
        name="Drawer"
        component={DrawerNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="WriteScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CollectionScreen"
        component={CollectionScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

export default TabNavigation;
