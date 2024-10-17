import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      register(values);
    },
  });

  return (
    <View className="bg-white flex-1 pt-10 px-5">
      <ScrollView
        contentContainerStyle={{
          // flex: 1,
          paddingBottom: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="mt-12 text-3xl text-black font-bold">
          Create your account
        </Text>
        <Text className="mt-3 text-lg text-gray-500 font-bold">
          Create an account and explore a tailored library of captivating books
          and stories.
        </Text>
        <KeyboardAvoidingView className="mt-4">
          <View className="py-2">
            <Text className="mt-3 text-lg text-gray-800 font-medium">
              First name
            </Text>
            <TextInput
              className="p-4 mt-2 rounded-md bg-gray-200 text-xl text-black"
              placeholder="First name"
              value={formik.values.firstname}
              onChangeText={formik.handleChange("firstname")}
              onBlur={formik.handleBlur("firstname")}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <Text className="text-red-500">{formik.errors.firstname}</Text>
            ) : null}
          </View>
          <View className="py-2">
            <Text className="mt-3 text-lg text-gray-800 font-medium">
              Last name
            </Text>
            <TextInput
              className="p-4 mt-2 rounded-md bg-gray-200 text-xl text-black"
              placeholder="Last name"
              value={formik.values.lastname}
              onChangeText={formik.handleChange("lastname")}
              onBlur={formik.handleBlur("lastname")}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <Text className="text-red-500">{formik.errors.lastname}</Text>
            ) : null}
          </View>
          <View className="py-2">
            <Text className="mt-3 text-lg text-gray-800 font-medium">
              Email address
            </Text>
            <TextInput
              className="p-4 mt-2 rounded-md bg-gray-200 text-xl text-black"
              placeholder="Email address"
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
              Phone Number
            </Text>
            <TextInput
              className="p-4 mt-2 rounded-md bg-gray-200 text-xl text-black"
              placeholder="Phone Number"
              value={formik.values.phoneNumber}
              onChangeText={formik.handleChange("phoneNumber")}
              onBlur={formik.handleBlur("phoneNumber")}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <Text className="text-red-500">{formik.errors.phoneNumber}</Text>
            ) : null}
          </View>
          <View className="py-2">
            <Text className="mt-3 text-lg text-gray-800 font-medium">
              Password
            </Text>
            <TextInput
              className="p-4 mt-2 rounded-md bg-gray-200 text-xl text-black"
              placeholder="Password"
              secureTextEntry
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
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;
