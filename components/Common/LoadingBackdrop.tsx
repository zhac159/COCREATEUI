import React, { FC } from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import {
  tabBarHeight,
  windowHeight,
  windowWidth,
} from "../Account/Common/getWindowDimensions";
import { ResizeMode, Video } from "expo-av";

type LoadingBackdropProps = {
  showVideo?: boolean;
};

const LoadingBackdrop: FC<LoadingBackdropProps> = ({ showVideo }) => {
  console.log("showVideo", showVideo);

  return (
    <View style={styles.backdrop}>
      {showVideo ? (
        <Video
          source={require("../../assets/videos/title-loading-animation.mp4")}
          isMuted={true}
          resizeMode={ResizeMode.CONTAIN}
          style={{
            height: "100%",
            width: "100%",
          }}
          shouldPlay
          isLooping
        />
      ) : (
        <View style={{ position: "absolute", zIndex: 1001 }}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
    </View>
  );
};

export default LoadingBackdrop;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    backgroundColor: "black",
    width: windowWidth,
    height: windowHeight + tabBarHeight,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
