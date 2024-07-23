import React, { FC } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "../Themes/theme";
import { BlurView } from "expo-blur";

type ConfirmationButtonsProps = {
  onConfirm: () => void;
  onCancel: () => void;
  swipingDistance: number;
};

const ConfirmationButtons: FC<ConfirmationButtonsProps> = ({
  onConfirm,
  onCancel,
  swipingDistance,
}) => {
  const theme = useTheme();

  const opacity = (swipingDistance / 5 / 100) * 255;

  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={{
          borderRadius: 400,
          height: 71,
          width: 71,
          overflow: "hidden",
        }}
        onPress={onCancel}
      >
        <View
          style={{
            height: 71,
            width: 71,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `rgb(${opacity}, 0, 0)`,
          }}
        >
          <FontAwesome6
            name="xmark"
            size={40}
            color={`rgb(${255 - opacity}, 0, 0)`}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderRadius: 400,
          height: 71,
          width: 71,
          overflow: "hidden",
        }}
        onPress={onConfirm}
      >
        <View
          style={{
            height: 71,
            width: 71,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `rgb(0, ${-opacity}, 0)`,
          }}
        >
          <FontAwesome6
            name="check"
            size={40}
            color={`rgb(0, ${255 + opacity}, 0)`}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmationButtons;

const styles = StyleSheet.create({
  buttonsContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: "7%",
    alignSelf: "center",
    gap: 30,
  },
});
