import React, { FC } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";


type ButtonWithIconProps = {
  text: string;
  icon: string;
  onPress: () => void;
};


const ButtonWithIcon: FC<ButtonWithIconProps> = ({ text, icon, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{
        ...styles.finishProjectButton,
        backgroundColor: theme.colors.primary,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          color: theme.colors.white,
          fontSize: 18,
        }}
      >
        {text}
      </Text>
      <FontAwesome6 name={icon} size={18} color={theme.colors.white} solid />
    </TouchableOpacity>
  );
};

export default ButtonWithIcon;

const styles = StyleSheet.create({
  finishProjectButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    maxWidth: 170,
    marginBottom: 10,
  },
});