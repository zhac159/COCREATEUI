import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useTheme } from "../Themes/theme";

type StyledButtonProps = {
  onPress: () => void;
  style: StyleProp<ViewStyle>;
  text: string;
};

const StyledButton: FC<StyledButtonProps> = ({ onPress, style, text }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: theme.colors.black,
        ...style as {},
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
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    borderRadius: 40,
    alignItems: "center",
    paddingVertical: 10,
  },
});
