import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useTheme } from "../Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";

type StyledButtonProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  text: string;
  icon?: string;
  textColour?: string;
};

const StyledButton: FC<StyledButtonProps> = ({
  onPress,
  style,
  text,
  icon,
  textColour,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: theme.colors.black,
        ...(style as {}),
      }}
      onPress={onPress}
    >
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          color: textColour ? textColour : theme.colors.white,
          fontSize: 18,
        }}
      >
        {text}
      </Text>
      {icon ? (
        <FontAwesome6
          name={icon}
          size={20}
          solid
          style={{
            marginTop: 5,
          }}
          color={textColour ? textColour : theme.colors.white}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    borderRadius: 40,
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 8,
    flexDirection: "row",
    gap: 15,
  },
});
