import React, { FC, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { ExperienceDTO } from "@/common/api/model";
import { ExperienceType } from "./ExperienceType";
import ProjectsCompleted from "./ProjectsCompleted";
import ProjectRolesCompleted from "./ProjectRolesCompleted";
import ExperienceCarousel from "./ExperienceCarousel";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { router } from "expo-router";

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

  console.log(completedProjects);

  const renderCompletedProjects = ({ item }: { item: ExperienceDTO }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        router.navigate({
          pathname: "/main/completedProject",
          params: {
            projectId: item.project?.id,
          },
        });
      }}
    >
      <ProjectsCompleted experience={item} />
    </TouchableWithoutFeedback>
  );

  const renderCompletedProjectRoles = ({ item }: { item: ExperienceDTO }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        router.navigate({
          pathname: "/main/completedProject",
          params: {
            projectId: item.projectRole.projectId,
          },
        });
      }}
    >
      <ProjectRolesCompleted experience={item} />
    </TouchableWithoutFeedback>
  );

  return (
    <View style={{ gap: 30, flex: 1, width: "100%" }}>
      {completedProjects.length > 0 && (
        <ExperienceCarousel
          experiences={completedProjects}
          title="Commissioned"
          renderItem={renderCompletedProjects}
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
