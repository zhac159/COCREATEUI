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

  const opacity = swipingDistance / 5 / 100 + 0.11;

  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={{
          borderRadius: 400,
          height: 71,
          width: 71,
          overflow: "hidden",
        }}
      >
        <BlurView
          style={{
            height: 71,
            width: 71,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba( 251, 0, 0," + (-opacity + 0.22) + ")",
          }}
          intensity={10}
        >
          <View
            style={{
              position: "absolute",
              paddingTop: 11,
              paddingRight: 1,
            }}
          >
            <FontAwesome6 name="xmark" size={38} color={theme.colors.black} />
          </View>
          <FontAwesome6 name="xmark" size={40} color={theme.colors.red} />
        </BlurView>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderRadius: 400,
          height: 71,
          width: 71,
          overflow: "hidden",
        }}
      >
        <BlurView
          style={{
            height: 71,
            width: 71,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(56, 250, 152, " + opacity + ")",
          }}
          intensity={10}
        >
          <View
            style={{
              position: "absolute",
              paddingTop: 11,
              paddingRight: 1,
            }}
          >
            <FontAwesome6 name="check" size={38} color={theme.colors.black} />
          </View>
          <FontAwesome6 name="check" size={40} color={theme.colors.green} />
        </BlurView>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmationButtons;

const styles = StyleSheet.create({
  buttonsContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 25,
    alignSelf: "center",
    gap: 30,
  },
});
