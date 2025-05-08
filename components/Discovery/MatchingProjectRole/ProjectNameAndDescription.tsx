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
