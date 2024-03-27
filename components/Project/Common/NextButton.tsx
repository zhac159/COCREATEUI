import { FC } from "react";
import { useTheme } from "../../Themes/theme";
import { TouchableOpacity, Text } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

type NextButtonPros = {
  onPress: () => void;
  text: string;
  icon: string;
};

const NextButton: FC<NextButtonPros> = ({ onPress, text, icon }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.colors.primary,
        alignSelf: "center",
        borderRadius: 21,
        flexDirection: "row",
        alignItems: "center",
        position: "absolute", // Position the button absolutely...
        bottom: 20, // ...at the bottom of its container
      }}
      onPress={onPress}
    >
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          color: theme.colors.white,
          paddingTop: 10,
          paddingBottom: 11,
          paddingRight: 5,
          paddingLeft: 16,
        }}
      >
        {text}
      </Text>
      <FontAwesome6
        name={icon}
        style={{
          paddingRight: 16,
          fontWeight: "bold",
          color: theme.colors.white,

          fontSize: 18,
        }}
      />
    </TouchableOpacity>
  );
};

export default NextButton;
