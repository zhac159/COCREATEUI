import { ExperienceDTO } from "@/common/api/model";
import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import Media from "../MediaViewer/Media";
import RoleDetailIconTexts from "../Discovery/MatchingProjectRole/RoleDetails/RoleDetailIconTexts";
import { useTheme } from "../Themes/theme";

type ProjectsCompletedProps = {
  experience: ExperienceDTO;
};

const ProjectsCompleted: FC<ProjectsCompletedProps> = ({ experience }) => {
  const theme = useTheme();

  return (
    <View style={styles.imageContainer}>
      <Media
        uri={experience.medias![0].uri}
        style={{ flex: 1, borderRadius: 14 }}
        onPress={() => {}}
      />
      <View
        style={{
          ...styles.details,
          backgroundColor: theme.colors.black,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 20
          }}
        >
          <RoleDetailIconTexts icon={"location-dot"} text={"London"} />
          <RoleDetailIconTexts icon={"calendar"} text={"17th Apr. - 18th Apr."} />
        </View>
        <Text
          style={{
            ...theme.customFonts.secondary.large,
            fontWeight: "400",
            fontSize: 20,
            color: theme.colors.white,
          }}
        >
          {experience.description}
        </Text>
      </View>
    </View>
  );
};

export default ProjectsCompleted;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    flexGrow: 1,
  },
  imageContainer: {
    height: 483,
    width: "90%",
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  details: {
    position: "absolute",
    bottom: 0,
    height: 160,
    width: "100%",
    paddingTop: 30,
    paddingBottom: 33,
    paddingHorizontal: 20,
    gap: 14
  },
});
