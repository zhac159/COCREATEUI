import { ReviewDTO } from "@/common/api/model";
import { FC } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "../../Themes/theme";
import UserProfileDetailsNumbers from "../UserProfile/UserProfileDetailsNumbers";
import { FontAwesome6 } from "@expo/vector-icons";

type ReviewCarouselProps = {
  reviews: ReviewDTO[];
  rating: number;
  totalReviews: number;
};

const ReviewCarousel: FC<ReviewCarouselProps> = ({
  reviews,
  rating,
  totalReviews,
}) => {
  const theme = useTheme();

  // const renderReview = ({ item }: { item: ReviewDTO }) => (

  // );

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.lightGray }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <UserProfileDetailsNumbers
          value={rating.toFixed(2)}
          text={
            <FontAwesome6
              name="star"
              size={17}
              color={theme.colors.black}
              solid
            />
          }
        />
        <View
          style={{
            height: 40,
            width: 1,
            backgroundColor: theme.colors.black,
            marginHorizontal: 20,
          }}
        />
        <UserProfileDetailsNumbers
          value={totalReviews}
          textStyle={{
            fontSize: 18,
            paddingLeft: 5,
            color: theme.colors.darkGray,
          }}
          valueStyle={{
            color: theme.colors.darkGray,
          }}
          text={"Reviews"}
        />
      </View>
    </View>
  );
};

export default ReviewCarousel;

const styles = StyleSheet.create({
  container: {
    height: 450,
    padding: 30,
    alignContent: "center",
  },
});
