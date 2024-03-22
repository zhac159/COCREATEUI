import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../../Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";

type RoleDetailIconTextxProps = {
  icon: string;
  text: string;
};

const RoleDetailIconTexts: FC<RoleDetailIconTextxProps> = ({ icon, text }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <FontAwesome6 name={icon} size={15} color={theme.colors.iconGray} />
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          ...styles.text,
          color: theme.colors.white,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default RoleDetailIconTexts;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    gap: 5,
  },
  text : {
    textAlign: "center",
    fontSize: 17,
  }
});
