import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import bookOneImage from "./../assets/images/bookOne.png";
import backIcon from "./../assets/images/back.png";
import notificationIcon from "./../assets/images/notification.png";

const BookDetails = () => {
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="max-w-[90%] w-auto mt-6">
          <Image
            source={bookOneImage}
            className="w-full rounded-lg self-center"
          />
        </View>

        {/* Title and Summary */}
        <View className="mt-5 border-b-2 pb-3 border-neutral-200">
          <Text className="text-2xl text-black font-bold">
            I want a Better Catastrophe
          </Text>
          <Text className="text-lg text-[#0D0842] font-bold">Andrew Boyd</Text>
          <Text className="text-lg text-nuetral-400 font-normal">
            The story follows a woman named Nora Seed
          </Text>
        </View>

        {/* Overview */}
        <View className="mt-5">
          <Text className="text-2xl text-black font-bold">Overview</Text>
          <Text className="text-lg text-neutral-500 font-normal">
            He searches out eight leading climate thinkers from
            collapse-psychologist Jamey Hecht to grassroots strategist adrienne
            maree brown, eco-philosopher Joanna Macy, and Indigenous botanist
            Robin Wall Kimmerer ― asking them: "Is it really the end of the
            world? and if so, now what?" With gallows humor and a broken heart,
            Boyd steers readers through their climate angst a Lorem ipsum, dolor
            sit amet consectetur adipisicing elit. Minima porro assumenda libero
            dolores harum, dolor impedit obcaecati! Fugiat, accusamus quos!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookDetails;
