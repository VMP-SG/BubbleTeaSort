import { TouchableOpacity, Text, View } from "react-native";

const MidFAB = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ top: -10, justifyContent: "center", alignItems: "center" }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: "#BC7C49",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};
export default MidFAB;
