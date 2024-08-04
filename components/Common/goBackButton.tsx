import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { IconButton } from "react-native-paper";
import { useTheme } from "../Themes/theme";

const GoBackButton = () => {
  const theme = useTheme();
  return (
    <IconButton
      onPress={() => {
        console.log("go back");
        router.back();
      }}
      icon={() => (
        <FontAwesome6 name="xmark" size={18} color={theme.colors.black} solid />
      )}
      size={18}
      style={{
        backgroundColor: theme.colors.white,
        position: "absolute",
        top: "10%",
        right: "1%",
        height: 30,
        width: 30,
        zIndex: 100,
      }}
    />
  );
};

export default GoBackButton;
