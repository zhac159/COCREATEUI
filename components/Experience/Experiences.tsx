import React, { FC, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { ExperienceDTO } from "@/common/api/model";
import { ExperienceType } from "./ExperienceType";
import ProjectsCompleted from "./ProjectsCompleted";
import ProjectRolesCompleted from "./ProjectRolesCompleted";
import ExperienceCarousel from "./ExperienceCarousel";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

type ExperiencesProps = {
  experiences: ExperienceDTO[];
};

const Experiences: FC<ExperiencesProps> = ({ experiences }) => {
  const completedProjects = useMemo(
    () =>
      experiences.filter((e) => e.experienceType === ExperienceType.Project),
    [experiences]
  );

  const completedProjectRoles = useMemo(
    () =>
      experiences.filter(
        (e) => e.experienceType === ExperienceType.ProjectRole
      ),
    [experiences]
  );

  const renderCompletedProjectsc = ({ item }: { item: ExperienceDTO }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log(item);
      }}
    >
      <ProjectsCompleted experience={item} />
    </TouchableWithoutFeedback>
  );

  const renderCompletedProjectRoles = ({ item }: { item: ExperienceDTO }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log(item);
      }}
    >
      <ProjectRolesCompleted experience={item} />
    </TouchableWithoutFeedback>
  );

  return (
    <View style={{ flex: 1, gap: 30 }}>
      {completedProjects.length > 0 && (
        <ExperienceCarousel
          experiences={completedProjects}
          title="Commissioned"
          renderItem={renderCompletedProjectsc}
        />
      )}
      {completedProjectRoles.length > 0 && (
        <ExperienceCarousel
          experiences={completedProjectRoles}
          title="Work Experience"
          renderItem={renderCompletedProjectRoles}
        />
      )}
    </View>
  );
};

export default Experiences;
