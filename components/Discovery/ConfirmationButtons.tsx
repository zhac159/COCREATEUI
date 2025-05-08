import React, { FC } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "../Themes/theme";
import { windowHeight } from "../Account/Common/getWindowDimensions";

type ConfirmationButtonsProps = {
  onConfirm: () => void;
  onCancel: () => void;
  swipingDistance: number;
  lightTheme?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
};

const ConfirmationButtons: FC<ConfirmationButtonsProps> = ({
  onConfirm,
  onCancel,
  swipingDistance,
  lightTheme,
  cancelButtonText,
  confirmButtonText,
}) => {
  const theme = useTheme();

  const opacity = -((swipingDistance / 5 / 100) * 255);

  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        onPress={onCancel}
        style={{
          alignItems: "center",
          height: 80,
        }}
      >
        <View
          style={{
            height: 71,
            width: 71,
            alignItems: "center",
            borderRadius: 400,
            borderWidth: lightTheme ? 2 : 0,
            borderColor: theme.colors.gray,
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
            backgroundColor: theme.colors.gray,
            right: 1.5,
            bottom: 10,
          }}
        />
        {cancelButtonText && (
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              fontSize: 15,
              width: 65,
              left: 10,
            }}
          >
            {cancelButtonText}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onConfirm}
        style={{
          alignItems: "center",
          height: 80,
        }}
      >
        <View
          style={{
            height: 71,
            width: 71,
            alignItems: "center",
            borderWidth: lightTheme ? 2 : 0,
            borderColor: theme.colors.gray,
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
            right: 1.5,
            bottom: 10,
          }}
        />
        {confirmButtonText && (
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              fontSize: 15,
              width: 65,
              left: 3,
            }}
          >
            {confirmButtonText}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmationButtons;

const styles = StyleSheet.create({
  buttonsContainer: {
    position: "absolute",
    flexDirection: "row",
    top: windowHeight * 0.81,
    alignSelf: "center",
    paddingHorizontal: 20,
    gap: 30,
  },
});
