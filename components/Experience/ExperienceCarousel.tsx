import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ExperienceDTO } from "@/common/api/model";
import { windowWidth } from "../Account/Common/getWindowDimensions";
import Carousel from "react-native-reanimated-carousel";

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
    <View
      style={{
        flex: 1,
        paddingTop: "10%",
        width: "87%",
        alignSelf: "center",
        marginRight: 40,
      }}
    >
      <Text
        style={{
          ...styles.experienceType,
        }}
      >
        {title}
      </Text>
      <Carousel
        width={windowWidth}
        vertical={false}
        loop={false}
        data={experiences}
        style={{ paddingLeft: 10 }}
        renderItem={renderItem}
        height={500}
        panGestureHandlerProps={{
          activeOffsetX: [-3, 3],
          failOffsetY: [-5, 5],
        }}
      />
    </View>
  );
};

export default ExperienceCarousel;

const styles = StyleSheet.create({
  experienceType: {
    fontSize: 17,
    fontWeight: "700",
    paddingLeft: 20,
  },
});
