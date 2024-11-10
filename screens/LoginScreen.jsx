import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <View className="bg-[#fbf7ef] flex-1 pt-10 px-5">
      <Text className="mt-12 text-3xl text-black font-bold">Log in</Text>
      <Text className="mt-3 text-lg text-gray-500 font-bold">
        Welcome back! Log in to resume your reading journey.
      </Text>
      <KeyboardAvoidingView className="mt-8">
        <View className="py-2">
          <Text className="mt-3 text-lg text-gray-800 font-medium">
            Email address
          </Text>
          <TextInput
            className="p-4 mt-2 rounded-md bg-gray-200 text-xl text-black"
            placeholder="Email address"
            id="email"
            name="email"
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <Text className="text-red-500">{formik.errors.email}</Text>
          ) : null}
        </View>
        <View className="py-2">
          <Text className="mt-3 text-lg text-gray-800 font-medium">
            Password
          </Text>
          <TextInput
            className="p-4 mt-2 rounded-md bg-gray-200 text-xl text-black"
            placeholder="password"
            secureTextEntry
            id="password"
            name="password"
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <Text className="text-red-500">{formik.errors.password}</Text>
          ) : null}
        </View>
        <View className="py-2 mt-5">
          <Pressable
            className="p-5 justify-center items-center bg-green-500 rounded-lg"
            onPress={formik.handleSubmit}
          >
            <Text className="text-2xl text-white font-medium">Log in</Text>
          </Pressable>
        </View>
        <View className="py-2 mt-5 flex-row justify-center items-center">
          <Text className="mt-3 text-xl text-gray-800 font-medium">
            Don't have an account?
          </Text>
          <TouchableOpacity
            className="mt-3 ml-2"
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text className="text-green-500 text-xl font-medium">Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
