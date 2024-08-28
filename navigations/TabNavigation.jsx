import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import CollectionScreen from "../screens/CollectionScreen";

// Icons
import homeTabIcon from "./../assets/images/home.png";
import homeTabIconActive from "./../assets/images/home_active.png";
import searchTabIcon from "./../assets/images/search.png";
import searchTabIconActive from "./../assets/images/search_active.png";
import collectionTabIcon from "./../assets/images/collection.png";
import collectionTabIconActive from "./../assets/images/collection_active.png";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let routeName = route.name;

          if (routeName == "HomeScreen") {
            iconName = focused ? homeTabIconActive : homeTabIcon;
          } else if (routeName === "SearchScreen") {
            iconName = focused ? searchTabIconActive : searchTabIcon;
          } else if (routeName === "CollectionScreen") {
            iconName = focused ? collectionTabIconActive : collectionTabIcon;
          }

          return (
            <Image
              source={iconName}
              style={[styles.icon, { tintColor: focused ? "#00B5B5" : "#000" }]}
            />
          );
        },
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 80,
          backgroundColor: "white",
        },
        tabBarShowLabel: false,
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
