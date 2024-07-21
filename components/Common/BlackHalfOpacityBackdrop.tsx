import React from "react";
import { View, StyleSheet } from "react-native";
import {
  windowHeight,
  windowWidth,
} from "@/components/Account/Common/getWindowDimensions";

const BlackHalfOpacityBackdrop = () => {
  return <View style={styles.blackHalfOpacityBackdrop} />;
};

export default BlackHalfOpacityBackdrop;

const styles = StyleSheet.create({
  blackHalfOpacityBackdrop: {
    width: windowWidth * 1.5,
    height: windowHeight * 1.5,
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.5,
  },
});
