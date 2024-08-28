import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const RegisterScreen = ({ navigation }) => {
  return (
    <View className="bg-white flex-1 pt-10 px-3">
      <Text className="mt-12 text-3xl text-black font-bold">
        Create your account
      </Text>
      <Text className="mt-3 text-lg text-gray-500 font-bold">
        Create an account and explore a tailored library of captivating stories.
      </Text>
      <KeyboardAvoidingView className="mt-8">
        <View className="py-2">
          <Text className="mt-3 text-lg text-gray-800 font-medium">
            Email address
          </Text>
          <TextInput
            className="p-4 mt-2 rounded-md bg-gray-200 text-xl text-black"
            placeholder="Email address"
            fon
          />
        </View>
        <View className="py-2">
          <Text className="mt-3 text-lg text-gray-800 font-medium">
            Password
          </Text>
          <TextInput
            className="p-4 mt-2 rounded-md bg-gray-200 text-xl text-black"
            placeholder="password"
            secureTextEntry
          />
        </View>
        <View className="py-2 mt-5">
          <Pressable
            className="p-5 justify-center items-center bg-green-500 rounded-lg"
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Text className="text-2xl text-white font-medium">
              Create new account
            </Text>
          </Pressable>
        </View>
        <View className="py-2 mt-5 flex-row justify-center items-center">
          <Text className="mt-3 text-xl text-gray-800 font-medium">
            Already have an account?
          </Text>
          <TouchableOpacity
            className="mt-3 ml-2"
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text className="text-green-500 text-xl font-medium">Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;
