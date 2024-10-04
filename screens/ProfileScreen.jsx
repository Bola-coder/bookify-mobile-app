import { StyleSheet, Pressable, Image, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import backIcon from "./../assets/images/back.png";
import notificationIcon from "./../assets/images/notification.png";

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="bg-white flex-1 pt-10 px-5">
      {/* Header */}
      <View className="flex-row justify-between items-center py-4 border-b-2 border-neutral-300">
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={backIcon} />
        </Pressable>
        <Image source={notificationIcon} />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
