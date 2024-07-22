import { FormPageProps } from "@/common/forms/formsHelper";
import { FC, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import OpinionSlider from "./OpinionSlider";

const SurveyForm: FC<FormPageProps> = ({ nextStep }) => {
  const [value, setValue] = useState(0);
  return (
    <View>
      <Text>Survey Form</Text>
      <OpinionSlider onValueChange={(value) => setValue(value)} value={value} />
    </View>
  );
};

export default SurveyForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
