import { useTheme } from "@/components/Themes/theme";
import React, { FC } from "react";
import { View, Text, TextStyle } from "react-native";

type UserProfileDetailsNumbersProps = {
  value: number | string;
  text: string | JSX.Element;
  valueStyle?: TextStyle;
  textStyle?: TextStyle;
};

const UserProfileDetailsNumbers: FC<UserProfileDetailsNumbersProps> = ({ value, text,valueStyle, textStyle }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 3,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          fontSize: 29,
          ...valueStyle
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          color: theme.colors.darkerGray,
          fontSize: 11,
          ...textStyle
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default UserProfileDetailsNumbers;
