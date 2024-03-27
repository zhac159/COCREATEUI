import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "../Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";

type RatingProps = {
  rating: number;
  white?: boolean;
};

const Rating: FC<RatingProps> = ({ rating, white = false }) => {
  const theme = useTheme();

  return (
    <View style={styles.ratingContainer}>
      <Text
        style={{
          ...theme.customFonts.primary.large,
          fontSize: 23,
          color:  white ? theme.colors.white:theme.colors.black,
        }}
      >
        {"4.8"}
      </Text>
      <FontAwesome6 name="star" size={13} color={white ? theme.colors.white:theme.colors.black} solid />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    gap: 2,
  },
});
