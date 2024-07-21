import React from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import {
    tabBarHeight,
  windowHeight,
  windowWidth,
} from "../Account/Common/getWindowDimensions";

const LoadingBackdrop = () => {
  return (
    <View style={styles.backdrop}>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
};

export default LoadingBackdrop;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    width: windowWidth,
    height: windowHeight + tabBarHeight,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
