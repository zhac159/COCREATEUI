import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Video } from "expo-av";
import { Image } from "expo-image";
import { Carousel } from "react-native-snap-carousel";
import { useMediaViewerState } from "@/components/MediaViewer/mediaViewerState";
import * as ScreenOrientation from 'expo-screen-orientation';
import { windowWidth } from "@/components/Account/Common/getWindowDimensions";

export default function PotofolioModal() {
  const [mediaViewer, mediaViewerState] = useMediaViewerState();

  const selectedImageIndex = mediaViewer.selectedImageIndex;

  const uris = mediaViewer.uris;

  const reorderedUris = [
    ...uris.slice(selectedImageIndex),
    ...uris.slice(0, selectedImageIndex),
  ];

  console.log("reorderedUris", reorderedUris);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);
  
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const uri = item as string;
    return (
      <View
        style={{
          flex: 1,
        }}
        key={index}
      >
        {uri?.endsWith(".mp4") ? (
          <Video
            source={{ uri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            shouldPlay
            useNativeControls
            isLooping
            style={{ flex: 1, marginVertical: "20%" }}
          />
        ) : (
          <Image source={{ uri }} style={{ flex: 1 }} />
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "black",
      }}
    >
      <Carousel
        vertical={false}
        data={reorderedUris}
        hasParallaxImages
        containerCustomStyle={{}}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});

{
  /* <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <NewPortofolioContentModal />
    </View> */
}
