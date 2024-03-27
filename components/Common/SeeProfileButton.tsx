import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../Themes/theme";

type SeeProfileButtonProps = {
  userId: number | undefined;
};

const SeeProfileButton: FC<SeeProfileButtonProps> = ({ userId }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: theme.colors.black,
      }}
    >
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          color: theme.colors.white,
          fontSize: 18,
        }}
      >
        See Profile
      </Text>
    </TouchableOpacity>
  );
};

export default SeeProfileButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    borderRadius: 40,
    alignItems: "center",
    paddingVertical: 10,
  },
});
