import React, { useState, FC } from "react";
import { View } from "react-native";
import Carousel, { TCarouselProps } from "react-native-reanimated-carousel";
import { Pagination } from "react-native-snap-carousel";
import { useTheme } from "../Themes/theme";

type StyledCarouselProps<T> = TCarouselProps<T> & {};

const StyledCarousel: FC<StyledCarouselProps<any>> = ({ ...props }) => {
  const theme = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <View>
      <Carousel
        vertical={false}
        loop={false}
        height={500}
        panGestureHandlerProps={{
          activeOffsetX: [-3, 3],
          failOffsetY: [-5, 5],
        }}
        {...props}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={props.data.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          position: "absolute",
          bottom: 0,
          marginLeft: "38%",
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
        }}
        dotColor={theme.colors.white}
        inactiveDotColor={theme.colors.gray}
        inactiveDotScale={1}
      />
    </View>
  );
};

export default StyledCarousel;
