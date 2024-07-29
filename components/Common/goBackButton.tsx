import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { IconButton } from "react-native-paper";
import { useTheme } from "../Themes/theme";

const GoBackButton = () => {
  const theme = useTheme();
  return (
    <IconButton
      onPress={() => {
        router.back();
      }}
      icon={() => (
        <FontAwesome6 name="x" size={18} color={theme.colors.black} solid />
      )}
      size={26}
      style={{
        backgroundColor: theme.colors.white,
        position: "absolute",
        top: "7%",
        right: "1%",
        zIndex: 100,
      }}
    />
  );
};

export default GoBackButton;
