import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "../screens/SearchScreen";
import CollectionScreen from "../screens/CollectionScreen";
import DrawerNavigation from "./DrawerNavigation";
import WriteScreen from "../screens/WriteScreen";

// Icons
import IonIcons from "@expo/vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let routeName = route.name;
          let size = 24;

          if (routeName == "HomeScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (routeName === "SearchScreen") {
            iconName = focused ? "search" : "search-outline";
          } else if (routeName === "CollectionScreen") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          } else if (routeName === "WriteScreen") {
            iconName = focused ? "add-circle" : "add-circle-outline";
            size = 40;
          } else if (routeName === "ProfileScreen") {
            iconName = focused ? "person" : "person-outline";
          }

          return <IonIcons name={iconName} size={size} color={color} />;
        },
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 80,
          backgroundColor: "#f2e9d3",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000000",
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
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
        component={WriteScreen}
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
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
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
