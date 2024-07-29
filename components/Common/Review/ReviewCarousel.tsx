import { ReviewDTO } from "@/common/api/model";
import { FC } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "../../Themes/theme";
import UserProfileDetailsNumbers from "../UserProfile/UserProfileDetailsNumbers";
import { FontAwesome6 } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import { windowWidth } from "@/components/Account/Common/getWindowDimensions";
import Review from "./Review";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const renderReview = ({ item }: { item: ReviewDTO }) => (
    <Review review={item} />
  );

  if (reviews.length === 0) {
   return null;
  }

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.lightGray }}
    >
      <View
        style={{
          flexDirection: "row",
          marginLeft: "10%",
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
          text={t("account.experience.reviews.title")}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignSelf: "center",
          width: "94%",
          overflow: "hidden",
        }}
      >
        <Carousel
          width={windowWidth}
          vertical={false}
          data={reviews}
          renderItem={renderReview}
          height={500}
          panGestureHandlerProps={{
            activeOffsetX: [-5, 5],
            failOffsetY: [-5, 5],
          }}
        />
      </View>
    </View>
  );
};

export default ReviewCarousel;

const styles = StyleSheet.create({
  container: {
    height: 400,
    paddingTop: 30,
    gap: 10,
    alignContent: "center",
    borderRadius: 14,
    overflow: "hidden",
  },
});
