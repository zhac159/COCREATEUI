import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useSkills } from "@/components/RecoilStates/profileState";
import { getSkillGroupColor } from "@/components/Account/Skills/skillHelper";
import { Animated, Image, Easing } from "react-native";
import { BlurView } from "expo-blur";

const BackgroundColourAnimation = () => {
  const skills = useSkills();

  var colors = [];

  if (!skills) {
    colors = ["#FF0000", "#00FF00", "#0000FF"];
  } else {
    colors = [
      ...new Set(
        skills.map((skill) =>
          skill.skillGroupType === undefined
            ? "white"
            : getSkillGroupColor(skill.skillGroupType)
        )
      ),
    ];
  }
  const rotateAnim = useRef(new Animated.Value(0)).current;
  let rotationValue = 0;
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      rotationValue = (rotationValue + 0.005) % 1;
      rotateAnim.setValue(rotationValue);
    }, 100);
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[
        styles.scene,
        {
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          height: "100%",
          width: "100%",
        },
      ]}
      pointerEvents="none"
    >
      <Animated.View
        style={{
          position: "absolute",
          transform: [{ rotate: rotation }],
        }}
      >
        <Animated.Image
          source={require("../../assets/images/blue.png")}
          style={{
            width: 700,
            height: 1000,
            position: "absolute",
            top: -500,
            left: -220,
          }}
        />
        <Animated.Image
          source={require("../../assets/images/cyan.png")}
          style={{
            width: 800,
            height: 1100,
            position: "absolute",
            top: -500,
            right: -300,
          }}
        />
      </Animated.View>
      <BlurView
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          backgroundColor: "white",
          opacity: 0.3,
        }}
      ></BlurView>
    </Animated.View>
  );
};

export default BackgroundColourAnimation;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  card: {
    width: 200,
    margin: 10,
    height: 200,
  },
  scene: {
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    alignContent: "center",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
