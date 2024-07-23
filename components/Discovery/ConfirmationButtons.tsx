import React, { FC } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "../Themes/theme";

type ConfirmationButtonsProps = {
  onConfirm: () => void;
  onCancel: () => void;
  swipingDistance: number;
  lightTheme?: boolean;
};

const ConfirmationButtons: FC<ConfirmationButtonsProps> = ({
  onConfirm,
  onCancel,
  swipingDistance,
  lightTheme,
}) => {
  const theme = useTheme();

  const opacity = -((swipingDistance / 5 / 100) * 255);

  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity onPress={onCancel}>
        <View
          style={{
            height: 71,
            width: 71,
            alignItems: "center",
            borderRadius: 400,
            marginTop: 0.2,
            justifyContent: "center",
            backgroundColor: lightTheme
              ? `rgb(220, ${220 - opacity}, ${220 - opacity})`
              : `rgb(${opacity + 20}, 0, 0)`,
          }}
        >
          <FontAwesome6
            name="xmark"
            size={40}
            color={`rgb(${255}, ${opacity}, ${opacity})`}
          />
        </View>
        <View
          style={{
            height: 71,
            width: 71,
            position: "absolute",
            borderRadius: 400,
            zIndex: -1,
            backgroundColor: theme.colors.darkGray,
            marginLeft: 1.5,
            marginBottom: 1,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onConfirm}>
        <View
          style={{
            height: 71,
            width: 71,
            alignItems: "center",
            borderRadius: 400,
            justifyContent: "center",
            backgroundColor: lightTheme
              ? `rgb(${opacity + 220}, 220, ${opacity + 220})`
              : `rgb(0, ${20 - opacity}, 0)`,
          }}
        >
          <FontAwesome6
            name="check"
            size={40}
            color={`rgb(${opacity}, ${255}, ${opacity})`}
          />
        </View>
        <View
          style={{
            height: 71,
            width: 71,
            position: "absolute",
            borderRadius: 400,
            zIndex: -1,
            backgroundColor: theme.colors.gray,
            marginLeft: 1.5,
            marginBottom: 1,
          }}
        />
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
    paddingHorizontal: 20,
    gap: 30,
  },
});
