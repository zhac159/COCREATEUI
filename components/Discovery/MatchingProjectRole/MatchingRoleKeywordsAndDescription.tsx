import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../Themes/theme";

type MatchingRoleKeywordsAndDescriptionProps = {
  tags: string[];
  description: string;
};

const MatchingRoleKeywordsAndDescription: FC<
  MatchingRoleKeywordsAndDescriptionProps
> = ({ tags, description }) => {
  const theme = useTheme();

  tags = ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8"];

  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.black,
      }}
    >
      <View style={{ ...styles.tagsContainer, gap: 10 }}>
        {tags.map((tag, index) => (
          <View
            key={index}
            style={{
              ...styles.tagContainers,
              backgroundColor: theme.colors.lightBlack,
            }}
          >
            <Text
              key={index}
              style={{
                ...theme.customFonts.primary.medium,
                ...styles.tagText,
                color: theme.colors.white,
              }}
            >
              {tag}
            </Text>
          </View>
        ))}
      </View>
      <View
        style={{
          ...styles.descriptionContainer,
        }}
      >
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
    </View>
  );
};

export default MatchingRoleKeywordsAndDescription;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagContainers: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  tagText : {
    textAlign: "center",
  },
  descriptionContainer: {
    paddingTop: 66,
    paddingBottom: 107,
  },
});
