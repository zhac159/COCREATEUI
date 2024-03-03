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
  const [key, setKey] = useState(Math.random());

  const selectedImageIndex = mediaViewer.selectedImageIndex;

  const uris = mediaViewer.uris;

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    setKey(Math.random()); 
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
        key={key} 
        vertical={false}
        data={uris}
        hasParallaxImages
        containerCustomStyle={{
          backgroundColor: "black",
        }}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        firstItem={selectedImageIndex}
      />
    </View>
  );
}