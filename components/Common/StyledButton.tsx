import React, { FC, useEffect, useRef } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  Animated,
} from "react-native";
import { useTheme } from "../Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type StyledButtonProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  text: string;
  icon?: string;
  textColour?: string;
  isLoading?: boolean;
  success?: boolean;
  disabled?: boolean;
};

const StyledButton: FC<StyledButtonProps> = ({
  onPress,
  style,
  text,
  icon,
  textColour,
  isLoading,
  success,
  disabled
}) => {
  const theme = useTheme();

  const translateX = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 150,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [translateX]);

  return (
    <TouchableOpacity
      style={{
        overflow: "hidden",
        ...styles.container,
        ...(style as {}),
        opacity: disabled ? 0.5 : 1,
        backgroundColor: success
        ? theme.colors.green
        : (style && 'backgroundColor' in style ? style.backgroundColor : theme.colors.primary),
      }}
      onPress={onPress}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: [{ translateX }],
          }}
        >
          <LinearGradient
            colors={[
              "rgba(255, 255, 255, 0)",
              "rgba(255, 255, 255, 0.01)",
              "rgba(255, 255, 255, 0.02)",
              "rgba(255, 255, 255, 0.03)",
              "rgba(255, 255, 255, 0.04)",
              "rgba(255, 255, 255, 0.05)",
              "rgba(255, 255, 255, 0.06)",
              "rgba(255, 255, 255, 0.07)",
              "rgba(255, 255, 255, 0.08)",
              "rgba(255, 255, 255, 0.09)",
              "rgba(255, 255, 255, 0.1)",
              "rgba(255, 255, 255, 0.11)",
              "rgba(255, 255, 255, 0.12)",
              "rgba(255, 255, 255, 0.13)",
              "rgba(255, 255, 255, 0.14)",
              "rgba(255, 255, 255, 0.15)",
              "rgba(255, 255, 255, 0.16)",
              "rgba(255, 255, 255, 0.17)",
              "rgba(255, 255, 255, 0.18)",
              "rgba(255, 255, 255, 0.19)",
              "rgba(255, 255, 255, 0.2)",
              "rgba(255, 255, 255, 0.21)",
              "rgba(255, 255, 255, 0.22)",
              "rgba(255, 255, 255, 0.21)",
              "rgba(255, 255, 255, 0.2)",
              "rgba(255, 255, 255, 0.19)",
              "rgba(255, 255, 255, 0.18)",
              "rgba(255, 255, 255, 0.17)",
              "rgba(255, 255, 255, 0.16)",
              "rgba(255, 255, 255, 0.15)",
              "rgba(255, 255, 255, 0.14)",
              "rgba(255, 255, 255, 0.13)",
              "rgba(255, 255, 255, 0.12)",
              "rgba(255, 255, 255, 0.11)",
              "rgba(255, 255, 255, 0.1)",
              "rgba(255, 255, 255, 0.09)",
              "rgba(255, 255, 255, 0.08)",
              "rgba(255, 255, 255, 0.07)",
              "rgba(255, 255, 255, 0.06)",
              "rgba(255, 255, 255, 0.05)",
              "rgba(255, 255, 255, 0.04)",
              "rgba(255, 255, 255, 0.03)",
              "rgba(255, 255, 255, 0.02)",
              "rgba(255, 255, 255, 0.01)",
              "rgba(255, 255, 255, 0)",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: "50%", // Narrower gradient for more pronounced shine
              height: "100%",
            }}
          />
        </Animated.View>
      ) : null}
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          color: textColour ? textColour : theme.colors.white,
          fontSize: 18,
          opacity: isLoading ? 0.5 : 1,
        }}
      >
        {text}
      </Text>
      {icon ? (
        <FontAwesome6
          name={icon}
          size={20}
          solid
          style={{
            marginTop: 5,
            opacity: isLoading ? 0.5 : 1,
          }}
          color={textColour ? textColour : theme.colors.white}
        />
      ) : null}
    </TouchableOpacity>
  );
};
export default StyledButton;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 26,
    borderRadius: 40,
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 7,
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
  },
});
