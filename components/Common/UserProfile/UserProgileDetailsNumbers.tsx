import { useTheme } from "@/components/Themes/theme";
import React, { FC } from "react";
import { View, Text } from "react-native";

type UserProgileDetailsNumbersProps = {
  value: number;
  text: string | JSX.Element;
};

const UserProgileDetailsNumbers: FC<UserProgileDetailsNumbersProps> = ({ value, text }) => {
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
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          color: theme.colors.darkerGray,
          fontSize: 11,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default UserProgileDetailsNumbers;
