import React, { useEffect, useRef } from "react";
import {
  Animated,
  View,
  StyleSheet
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSkills } from "@/components/RecoilStates/profileState";
import { getSkillGroupColor } from "@/components/Account/Skills/skillHelper";


const BackgroundColourAnimation = () => {

    const skills = useSkills();
  
    var colors = [];
  
    if(!skills) {
      colors = ["#FF0000", "#00FF00", "#0000FF"];
    }
    else {
      colors = [...new Set(skills.map(skill => skill.skillGroupType === undefined ? "white":getSkillGroupColor(skill.skillGroupType)))];
    }
  
    colors.filter((color) => color !== "white");
  
    if (colors.length === 0) {
      colors = ["white", "white"];
    }
  
    if (colors.length === 1) {
      colors = [colors[0], colors[0]];
    }
    
    const animatedValue = useRef(new Animated.Value(0)).current;
    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 30000,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 30000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }, []);
  
    const colorInterpolation = animatedValue.interpolate({
      inputRange:  colors.map((_, index) => index / (colors.length - 1)),
      outputRange: colors,
    });
  
    return (
      <View
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
            ...styles.gradient,
            backgroundColor: colorInterpolation,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <LinearGradient
            colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
          />
        </Animated.View>
      </View>
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
  