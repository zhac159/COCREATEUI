import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../Themes/theme";

type ProjectNameAndDescriptionProps = {
  name: string;
  description: string;
};

const ProjectNameAndDescription: FC<ProjectNameAndDescriptionProps> = ({
  name,
  description,
}) => {
  const theme = useTheme();

  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.darkestGray,
      }}
    >
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          color: theme.colors.white,
          fontSize: 32,
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          color: theme.colors.white,
          fontSize: 19,
        }}
      >
        {description}
      </Text>
    </View>
  );
};

export default ProjectNameAndDescription;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 62,
    paddingHorizontal: 28,
    gap: 25,
  },
});
