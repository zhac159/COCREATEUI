import { PortofolioContentDTO } from "@/common/api/model";
import { FC, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";
import { Image, ImageStyle } from "expo-image";
import Swiper from "react-native-swiper";
import { Carousel, Pagination } from "react-native-snap-carousel";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "@/components/Themes/theme";
import { skillStyles } from "../Skills/Skill";
import Modal from "react-native-modal";
import { router } from "expo-router";
import { useSetMediaViewerState } from "@/components/MediaViewer/mediaViewerState";
import { windowWidth } from "../Common/getWindowDimensions";

type portofolioContentProps = {
  portofolioContent: PortofolioContentDTO;
};

//using fc

const PortofolioContent: FC<portofolioContentProps> = ({
  portofolioContent,
}) => {
  const uris = portofolioContent.medias?.map((media) => media.uri || "") || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const setMediaViewer = useSetMediaViewerState();

  const handlePress = (uri: string) => {
    setMediaViewer({
      uris,
      visible: false,
      selectedImageIndex: uris.indexOf(uri),
    });
    router.push("/portofolioModal")
  };
  const theme = useTheme();

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const uri = item as string;
    return (
      <TouchableOpacity
        onPress={() => handlePress(uri)}
        style={styles.imageContainer}
        activeOpacity={1}
        key={index}
      >
        {uri?.endsWith(".mp4") ? (
          <Video
            source={{ uri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            shouldPlay
            isLooping
            style={{ flex: 1, borderRadius: 14 }}
          />
        ) : (
          <Image source={{ uri }} style={{ flex: 1, borderRadius: 14 }} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        vertical={false}
        data={uris}
        hasParallaxImages
        containerCustomStyle={{
          paddingLeft: 9,
          paddingTop: 12,
          paddingBottom: 12,
        }}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        onScrollIndexChanged={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={uris.length}
        activeDotIndex={activeIndex}
        containerStyle={{
          position: "absolute",
          bottom: 0,
          marginBottom: 30,
          alignSelf: "center",
        }}
        dotStyle={{
          width: 13,
          height: 13,
          borderRadius: 15,
          backgroundColor: theme.colors.white,
          marginHorizontal: -2,
        }}
        inactiveDotStyle={{
          width: 13,
          height: 13,
          borderRadius: 15,
          backgroundColor: theme.colors.gray,
          marginHorizontal: -2,
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
        }}
      >
        <View style={skillStyles.skillIcon}>
          <FontAwesome6
            name="camera"
            size={17}
            color={theme.colors.white}
            solid
          />
        </View>
        <Text
          style={{
            ...theme.customFonts.primary.small,
            width: "80%",
          }}
        >
          {"Editinga Short Film fo rmy professional carrer"}
        </Text>
      </View>
    </View>
  );
};

export default PortofolioContent;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    width: "100%",
    marginRight: 40,
  },
  imageContainer: {
    backgroundColor: "black",
    height: 483,
    width: "90%",
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});
