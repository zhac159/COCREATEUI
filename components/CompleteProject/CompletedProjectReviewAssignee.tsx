import {
  ReviewCreateDTO,
  SkillType,
  UserInformationDTO,
} from "@/common/api/model";
import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../Themes/theme";
import SkillIcon from "../Account/Skills/SkillIcon";
import { getSkill } from "../Account/Skills/skillHelper";
import { Rating } from "react-native-ratings";
import SkillTag from "../Account/Skills/SkillTag";

type CompleteProjectReviewAssigneeProps = {
  reviewed: UserInformationDTO;
  roleSkill?: SkillType;
  onReviewChange: (review: ReviewCreateDTO) => void;
};

const CompleteProjectReviewAssignee: FC<CompleteProjectReviewAssigneeProps> = ({
  reviewed,
  roleSkill,
  onReviewChange,
}) => {
  const theme = useTheme();

  const [review, setReview] = useState<ReviewCreateDTO>({
    description: "",
    rating: 5,
    reviewedUserId: reviewed.userId,
  });

  useEffect(() => {
    onReviewChange(review);
  }, [review]);

  return (
    <>
      <Text
        style={{
          ...styles.title,
          ...theme.customFonts.secondary.small,
          fontSize: 35,
        }}
      >
        Give feedback for
      </Text>
      <Text
        style={{
          ...styles.title,
          ...theme.customFonts.secondary.small,
          fontSize: 35,
          fontWeight: "bold",
        }}
      >
        {reviewed.username}
      </Text>
      <SkillTag skill={roleSkill} style={{marginTop:20}} />
      <View
        style={{
          ...styles.ratingInput,
        }}
      >
        <Rating
          style={{
            alignSelf: "flex-start",
          }}
          imageSize={25}
          fractions={1}
          onFinishRating={(rating: number) => {
            setReview((prev) => ({ ...prev, rating }));
          }}
          startingValue={5}
          ratingColor={theme.colors.primary}
          ratingBackgroundColor={theme.colors.gray}
          tintColor="white"
          type="custom"
        />
        <TextInput
          placeholder="Review..."
          style={{
            ...theme.customFonts.primary.small,
            ...styles.ratingText,
            backgroundColor: theme.colors.lightGray,
          }}
          multiline={true}
          value={review.description!}
          onChangeText={(text) =>
            setReview((prev) => ({ ...prev, description: text }))
          }
        />
      </View>
    </>
  );
};

export default CompleteProjectReviewAssignee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 30,
    paddingTop: "20%",
    paddingHorizontal: 29,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  ratingText: {
    fontWeight: "700",
    padding: 10,
    borderRadius: 7,
    height: "70%",
    textAlignVertical: "top",
  },
  ratingInput: {
    paddingTop: 60,
    marginHorizontal: -15,
    gap: 5,
  },
});
