import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  useExperiencesValue,
  useReviewDetailsValue,
} from "../RecoilStates/profileState";
import { ExperienceType } from "./ExperienceType";
import ProjectsCompleted from "./ProjectsCompleted";
import { ExperienceDTO } from "@/common/api/model";
import { Carousel } from "react-native-snap-carousel";
import { windowWidth } from "../Account/Common/getWindowDimensions";
import ProjectRolesCompleted from "./ProjectRolesCompleted";
import ExperienceCarousel from "./ExperienceCarousel";
import ReviewCarousel from "../Common/Review/ReviewCarousel";

const ExperienceTab = () => {
  const experiences = useExperiencesValue();
  const reviewDetails = useReviewDetailsValue();

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
    <ProjectsCompleted experience={item} />
  );

  const renderCompletedProjectRoles = ({ item }: { item: ExperienceDTO }) => (
    <ProjectRolesCompleted experience={item} />
  );

  return (
    <View style={{ flex: 1, paddingVertical: 54, gap: 46 }}>
      <ExperienceCarousel
        experiences={completedProjects}
        title="Commissioned"
        renderItem={renderCompletedProjectsc}
      />
      <ExperienceCarousel
        experiences={completedProjectRoles}
        title="Work Experience"
        renderItem={renderCompletedProjectRoles}
      />
      <ReviewCarousel
        reviews={reviewDetails.reviewsReceived}
        rating={reviewDetails.rating}
        totalReviews={reviewDetails.totalReviews}
      />
    </View>
  );
};

export default ExperienceTab;

const styles = StyleSheet.create({
  experienceType: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
    paddingLeft: 20,
  },
});
