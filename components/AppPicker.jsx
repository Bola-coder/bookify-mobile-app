import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
const AppPicker = ({
  items,
  bgColor,
  color,
  prompt,
  defaultValue,
  onPickerValueChange,
}) => {
  const [selectedItem, setSelectedItem] = useState(defaultValue);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectItem = (item) => {
    setSelectedItem(item.value);
    onPickerValueChange(item.value);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleSelectItem(item)}
    >
      <Text style={[styles.itemText, { color: color || "#141414" }]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      {/* Touchable to Open Modal */}
      <TouchableOpacity
        style={[
          styles.pickerContainer,
          { backgroundColor: bgColor || "#F2F2F2" },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.selectedText, { color: color || "#141414" }]}>
          {selectedItem
            ? items.find((item) => item.value === selectedItem)?.label
            : prompt}
        </Text>
        <Icon name="chevron-down" size={20} color={color || "#141414"} />
      </TouchableOpacity>

      {/* Modal for Custom Dropdown */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 22,
    marginTop: 10,
    marginBottom: 20,
  },
  selectedText: {
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 30,
    borderRadius: 10,
    paddingVertical: 20,
  },
  itemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 16,
  },
});

export default AppPicker;
