import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (err) {
    console.log("An error occured while storing item");
    console.log(err);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value != null) {
      return value;
    }
  } catch (err) {
    console.log("An error occured while getting data");
  }
};

const getObjectData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (err) {
    console.log("An error occured while getting data");
  }
};

const deleteDataFromStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Done Removing");
  } catch (e) {
    console.log("An error occured while deleting data");
  }
};

export default { storeData, getData, getObjectData, deleteDataFromStorage };
