import React from "react";
import { View, StyleSheet } from "react-native";
import {
  useExperiencesValue,
  useReviewDetailsValue,
} from "../RecoilStates/profileState";
import ReviewCarousel from "../Common/Review/ReviewCarousel";
import Experiences from "./Experiences";

const ExperienceTab = () => {
  const experiences = useExperiencesValue();
  const reviewDetails = useReviewDetailsValue();

  return (
    <View style={{ flex: 1, paddingVertical: 54, gap: 46 }}>
      <Experiences experiences={experiences} />
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
