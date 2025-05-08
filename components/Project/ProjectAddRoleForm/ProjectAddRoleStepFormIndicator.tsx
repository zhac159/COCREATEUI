import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

type FormStepIndicatorProps = {
  steps: number;
  currentStep: number;
  onStepChange: (step: number) => void;
};

const FormStepIndicator: React.FC<FormStepIndicatorProps> = ({
  steps,
  currentStep,
  onStepChange,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: steps }).map((_, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => onStepChange(i)}
          hitSlop={{ top: 5, bottom: 5, left: 2, right: 2 }}
        >
          <View style={[styles.dot, i === currentStep && styles.activeDot]} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#ccc",
    margin: 5,
  },
  activeDot: {
    backgroundColor: "#000",
  },
});

export default FormStepIndicator;
