import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../Themes/theme";
import { router } from "expo-router";
import StyledButton from "./StyledButton";

type SeeProfileButtonProps = {
  userId: number | undefined;
};

const SeeProfileButton: FC<SeeProfileButtonProps> = ({ userId }) => {
  const theme = useTheme();

  const handlePress = () => {
    router.navigate({
      pathname: "/main/accountViewer",
      params: {
        userId,
      },
    });
  };

  return (
    <StyledButton
      onPress={handlePress}
      text="See Profile"
      style={{
        backgroundColor: theme.colors.black,
      }}
    />
  );
};

export default SeeProfileButton;
