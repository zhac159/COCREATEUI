import { PortofolioContentDTO } from "@/common/api/model";
import { FC, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Carousel, Pagination } from "react-native-snap-carousel";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "@/components/Themes/theme";
import { skillStyles } from "../Skills/Skill";
import { router } from "expo-router";
import { useSetMediaViewerState } from "@/components/MediaViewer/mediaViewerState";
import { windowWidth } from "../Common/getWindowDimensions";
import Media from "@/components/MediaViewer/Media";
import { useCacheImages } from "@/components/MediaViewer/mediaViewerHelper";
import { Portal } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type portofolioContentProps = {
  portofolioContent: PortofolioContentDTO;
};

const PortofolioContent: FC<portofolioContentProps> = ({
  portofolioContent,
}) => {
  const uris = portofolioContent.medias?.map((media) => media.uri || "") || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const [cachedUris, setCachedUris] = useState<string[]>([]);
  const cacheImages = useCacheImages();

  const fetchCachedUris = async (asset: PortofolioContentDTO) => {
    var uris = asset.medias?.map((media) => media.uri || "") || [];

    var result = await cacheImages(uris || []);

    setCachedUris(result);
  };
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handlePress = () => {
    setIsFullScreen(!isFullScreen);
  };

  const theme = useTheme();

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const uri = item as string;
    return (
      <View
        style={isFullScreen ? styles.fullScreenImage : styles.imageContainer}
        key={index}
      >
        <Media
          uri={cachedUris[index] || uri}
          style={{ height: "100%", width: "100%", borderRadius: 7 }}
          onPress={() => handlePress()}
        />
      </View>
    );
  };

  useEffect(() => {
    fetchCachedUris(portofolioContent);
  }, [portofolioContent.medias, cacheImages]);

  return (
    <View style={styles.container}>
      {/* <Portal>
        <GestureHandlerRootView
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            pointerEvents: isFullScreen ? "auto" : "none",
          }}
        >
          <Carousel
            vertical={false}
            data={uris}
            hasParallaxImages
            containerCustomStyle={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              zIndex: 1,
              display: isFullScreen ? "flex" : "none",
            }}
            renderItem={renderItem}
            sliderWidth={windowWidth}
            itemWidth={windowWidth}
          />
        </GestureHandlerRootView>
      </Portal> */}
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
  fullScreenImage: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
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
