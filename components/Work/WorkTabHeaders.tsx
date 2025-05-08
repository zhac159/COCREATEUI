import React, { FC } from "react";
import { Text, View } from "react-native";
import { useTheme } from "../Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";

type WorkTabHeadersProps = {
  title: string;
  onTitlePress?: () => void;
  isExandalbe?: boolean;
  isExpanded?: boolean;
};

const WorkTabHeaders: FC<WorkTabHeadersProps> = ({
  title,
  onTitlePress,
  isExandalbe,
  isExpanded,
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
      }}
    >
      <Text
        onPress={() => {
          onTitlePress?.();
        }}
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: theme.colors.black,
        }}
      >
        {title}
      </Text>
      {isExandalbe && (
        <FontAwesome6
          name={isExpanded ? "angle-down" : "angle-right"}
          size={20}
          color={theme.colors.black}
        />
      )}
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
