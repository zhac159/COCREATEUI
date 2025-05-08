import { ReviewDTO } from "@/common/api/model/reviewDTO";
import { useTheme } from "@/components/Themes/theme";
import { formatDistance, parseISO } from "date-fns";
import { FC, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Rating } from "react-native-ratings";

type ReivewProps = {
  review: ReviewDTO;
};

const Review: FC<ReivewProps> = ({ review }) => {
  const theme = useTheme();

  const date = useMemo(() => {
    const date = parseISO(review.createdAt);

    return formatDistance(date, new Date(), { addSuffix: true });
  }, [review.createdAt]);

  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Rating
          style={{
            alignSelf: "flex-start",
          }}
          imageSize={20}
          readonly
          startingValue={review.rating}
          ratingColor={"black"}
          ratingBackgroundColor={theme.colors.gray}
          tintColor="white"
          type="custom"
        />
        <Text
          style={{
            ...theme.customFonts.secondary.medium,
            fontWeight: "400",
          }}
        >
          {review.reviewerUser.username}
        </Text>
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            fontSize: 14,
          }}
        >
          {date}
        </Text>
      </View>
      <Text
        style={{
          ...theme.customFonts.primary.small,
        }}
        numberOfLines={12}
      >
        {review.description}
      </Text>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    height: 305,
    backgroundColor: "white",
    width: "87%",
    borderRadius: 7,
    padding: 17,
    gap: 30,
  },
});
