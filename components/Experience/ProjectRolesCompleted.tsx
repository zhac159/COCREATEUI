import { ExperienceDTO } from "@/common/api/model";
import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import Media from "../MediaViewer/Media";
import { useTheme } from "../Themes/theme";
import SkillTag from "../Account/Skills/SkillTag";

type ProjectRolesCompletedProps = {
  experience: ExperienceDTO;
};

const ProjectRolesCompleted: FC<ProjectRolesCompletedProps> = ({
  experience,
}) => {
  const theme = useTheme();
  
  return (
    <View style={styles.imageContainer}>
      <Media
        uri={experience.medias![0].uri}
        style={{ flex: 1, borderRadius: 14 }}
        onPress={() => {}}
      />
      <SkillTag
        skill={experience.projectRole?.skillType}
        textStyle={{
          color: theme.colors.white,
          fontSize: 17,
          fontWeight: "700",
        }}
        style={{
          position: "absolute",
          bottom: 175,
          marginLeft: 20,
        }}
      />
      <View
        style={{
          ...styles.details,
          backgroundColor: theme.colors.white,
        }}
      >
        <Text
          style={{
            ...theme.customFonts.secondary.large,
            fontWeight: "400",
            fontSize: 20,
          }}
        >
          {experience.description}
        </Text>
      </View>
    </View>
  );
};

export default ProjectRolesCompleted;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    flexGrow: 1,
  },
  imageContainer: {
    height: 483,
    width: "90%",
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.58,
    shadowRadius: 5,
    elevation: 10,
    overflow: "hidden",
  },
  details: {
    position: "absolute",
    bottom: 0,
    height: 160,
    width: "100%",
    paddingTop: 30,
    paddingBottom: 33,
    paddingHorizontal: 20,
    gap: 14,
  },
});
