import useThemedStyles from "@/components/Common/StyledComponents/hooks/useThemedStyles";
import CustomTheme from "@/components/Themes/themeType";
import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type MultiStepFormIndicatorProps = {
  steps: number;
  currentStep: number;
  onStepPress: (step: number) => void;
  stepsWithErrorsIndexes: number[];
};

export const MultiStepFormIndicator: FC<MultiStepFormIndicatorProps> = ({
  steps,
  currentStep,
  onStepPress,
  stepsWithErrorsIndexes = [],
}) => {
  const styles = useThemedStyles(getStyles);

  return (
    <View style={styles.container}>
      {Array.from({ length: steps }).map((_, index) => (
        <TouchableOpacity
          hitSlop={10}
          key={index}
          onPress={() => onStepPress(index)}
          style={[
            styles.step,
            index === currentStep && styles.stepActive,
            stepsWithErrorsIndexes.includes(index) && styles.stepError,
          ]}
        />
      ))}
    </View>
  );
};

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 20,
    },
    step: {
      width: 15,
      height: 15,
      borderRadius: 15,
      backgroundColor: theme.colors.gray,
    },
    stepActive: {
      backgroundColor: theme.colors.primary,
    },
    stepError: {
      backgroundColor: theme.colors.red,
    },
  });
