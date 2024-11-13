import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import TabScreenHeader from "../components/TabScreenHeader";

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="bg-[#f2e9d3] flex-1 pt-10 px-5">
      {/* Header */}
      <TabScreenHeader title="Profile" />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
