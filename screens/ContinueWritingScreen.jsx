import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useRef } from "react";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import Header from "../components/Header";
const ContinueWritingScreen = ({ route, navigation }) => {
  const { book } = route.params;
  const richText = useRef();

  const handleSave = () => {
    richText.current?.getContentHtml().then((html) => {
      console.log(html);
    });
  };

  const HeaderOneIcon = ({ tintColor }) => (
    <Text
      style={{
        color: tintColor,
      }}
      className="text-2xl font-medium"
    >
      H1
    </Text>
  );
  const HeaderTwoIcon = ({ tintColor }) => (
    <Text
      style={{
        color: tintColor,
      }}
      className="text-2xl font-medium"
    >
      H2
    </Text>
  );
  return (
    <View className="bg-[#f2e9d3] flex-1 pt-10 px-5">
      <Header title="Continue Writing" />

      <KeyboardAvoidingView behavior="padding" className="flex-1">
        {/* Save button to the right */}
        <TouchableOpacity
          //   onPress={handleSave}
          className="mt-2 py-2 px-6-300 self-end"
        >
          <Text className="text-xl font-bold">Save</Text>
        </TouchableOpacity>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        >
          <View className="mt-2 items-center">
            <Text className="text-xl font-bold mt-4">{book.title}</Text>
            <Text className="text-lg font-bold text-gray-500">
              {book.description}
            </Text>
          </View>
          <View className="mt-4 items-center">
            <Text className="text-xl font-bold">
              Chapter {book.chapters.length + 1}
            </Text>
          </View>

          {/* Input for chapter title */}
          <View className="mt-4">
            <Text className="text-lg font-bold">Chapter Title</Text>
            <TextInput
              className="border-[1px] rounded-lg h-[50px] px-3 mt-2 text-2xl font-bold"
              placeholder="Enter chapter title"
              autoCorrect={false}
              // id="title"
              // name="title"
              // value={formik.values.title}
              // onChangeText={formik.handleChange("title")}
              // onBlur={formik.handleBlur("title")}
            />
            {/* {formik.touched.title && formik.errors.title ? (
                <Text className="text-red-500">{formik.errors.title}</Text>
            ) : null} */}

            <Text className="text-lg font-bold mt-4 mb-2">Content</Text>
            <RichEditor
              ref={richText}
              style={styles.richEditor}
              placeholder="Start writing here..."
              initialHeight={300}
              editorStyle={{ backgroundColor: "#f2e9d3" }}
              pasteAsPlainText={false}
            />
          </View>
        </ScrollView>
        {/* Toolbar with common formatting options */}
        <View className="w-full mb-8">
          <RichToolbar
            editor={richText}
            actions={[
              actions.undo,
              actions.redo,
              actions.setBold,
              actions.setItalic,
              actions.heading1,
              actions.heading2,
              actions.setUnderline,
              actions.keyboard,
            ]}
            iconTint={"#000"}
            selectedIconTint={"#FBBC05"}
            selectedButtonStyle={{ backgroundColor: "#f2e9d3", margin: 2 }}
            style={{
              height: 50,
              backgroundColor: "#f2e9d3",
            }}
            iconMap={{
              [actions.heading1]: HeaderOneIcon,
              [actions.heading2]: HeaderTwoIcon,
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ContinueWritingScreen;

const styles = StyleSheet.create({
  richEditor: {
    height: 700,
    backgroundColor: "inherit",
    // padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
});
