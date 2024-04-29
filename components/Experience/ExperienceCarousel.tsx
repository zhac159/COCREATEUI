import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ExperienceDTO } from "@/common/api/model";
import { Carousel } from "react-native-snap-carousel";
import { windowWidth } from "../Account/Common/getWindowDimensions";

type ExperienceCarouselProps = {
  experiences: ExperienceDTO[];
  title: string;
  renderItem: ({ item }: { item: ExperienceDTO }) => JSX.Element;
};

const ExperienceCarousel: FC<ExperienceCarouselProps> = ({
  experiences,
  title,
  renderItem,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          ...styles.experienceType,
        }}
      >
        {title}
      </Text>
      <Carousel
        vertical={false}
        data={experiences}
        inactiveSlideOpacity={1}
        hasParallaxImages
        containerCustomStyle={{
          paddingLeft: 9,
        }}
        contentContainerCustomStyle={{
          paddingVertical: 20
        }}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
      />
    </View>
  );
};

export default ExperienceCarousel;

const styles = StyleSheet.create({
  experienceType: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
    paddingLeft: 20,
  },
});
