import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useImagePicker } from "../hooks/useImagePicker";

const WriteNewBookModal = ({ modalVisible, onClose }) => {
  const { image, pickImage } = useImagePicker();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View className="bg-transparent flex-1 justify-end items-center">
        <View className="bg-[#fbf7ef] w-full h-[95%] max-h-[95%] p-4 rounded-3xl border-transparent">
          {/* Header wth a close Icon to the right */}
          <View className="flex-row justify-between items-center p-2 rounded-xl">
            <Text className="text-2xl font-bold">Write a new story</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <Text className="text-sm text-gray-500 mt-2">
            Ensure to save before closing this modal so you don't lose your work
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              className="flex-row items-center mt-4 h-[80px] border-[1px] rounded-lg border-neutral-200"
              onPress={pickImage}
            >
              <View className="bg-black h-full justify-center px-3 rounded-lg">
                <Icon name="plus-circle-outline" size={28} color="#FFF" />
              </View>
              <View className="ml-4">
                <Text className="text-lg font-bold">Add Cover</Text>
                <Text className="text-sm text-gray-500">
                  Add a cover image for your story
                </Text>
              </View>
            </TouchableOpacity>

            {image && (
              <View className="mt-4">
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: 150 }}
                />
              </View>
            )}

            <View className="mt-4">
              <View>
                <Text className="text-lg font-bold">Story Title</Text>
                <TextInput
                  className="border-[1px] rounded-lg h-[50px] px-3 mt-2"
                  placeholder="Enter story title"
                  autoCorrect={false}
                  inputMode="text"
                />
              </View>
              <View className="mt-4">
                <Text className="text-lg font-bold">Description</Text>
                <TextInput
                  className="border-[1px] rounded-lg h-[70px] px-3 mt-2"
                  placeholder="Enter story description"
                  multiline={true}
                  numberOfLines={3}
                />
              </View>
              <View className="mt-4">
                <Text className="text-lg font-bold">Summary</Text>
                <TextInput
                  className="border-[1px] rounded-lg h-[150px] px-3 mt-2"
                  multiline={true}
                  placeholder="Enter story summary"
                  numberOfLines={8}
                />
              </View>
              <TouchableOpacity className="mt-4 bg-[#FBBC05] py-4 px-4 rounded-lg items-center">
                <Text className="text-xl font-bold text-white">Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default WriteNewBookModal;

const styles = StyleSheet.create({});
