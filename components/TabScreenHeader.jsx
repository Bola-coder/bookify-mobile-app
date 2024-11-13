import { View, Text, Pressable, Image } from "react-native";
import notificationIcon from "./../assets/images/notification.png";

const TabScreenHeader = ({ title }) => {
  return (
    <View className="flex-row justify-between items-center py-4 border-b-2 border-neutral-300">
      <Text className="text-2xl text-[#000000] font-bold">{title}</Text>
      <Image source={notificationIcon} />
    </View>
  );
};

export default TabScreenHeader;
// #FBBC05
