import React, { FC } from "react";
import { Text, View } from "react-native";
import { useTheme } from "../Themes/theme";

type WorkTabHeadersProps = {
  title: string;
};

const WorkTabHeaders: FC<WorkTabHeadersProps> = ({ title }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "black",
        }}
      >
        {title}
      </Text>
      <View
        style={{
          height: 1,
          flex: 1,
          backgroundColor: theme.colors.lightGray,
        }}
      />
    </View>
  );
};

export default WorkTabHeaders;
