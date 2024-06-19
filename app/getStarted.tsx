import BackgroundColourAnimation from "@/components/Account/BackgroundColourAnimation";
import { windowHeight } from "@/components/Account/Common/getWindowDimensions";
import AddPortofolioForm from "@/components/GetStarted/AddPortofolioForm";
import AddSkillForm from "@/components/GetStarted/AddSkillForm";
import LocationForm from "@/components/GetStarted/LocationForm";
import NameAndPasswordForm from "@/components/GetStarted/NameAndPasswordForm";
import { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function GetStarted() {
  const [index, setIndex] = useState(0);

  const forms = [
    <NameAndPasswordForm nextStep={() => setIndex(index + 1)} />,
    <LocationForm nextStep={() => setIndex(index + 1)} />,
    <AddSkillForm nextStep={() => setIndex(index + 1)} />,
    <AddPortofolioForm nextStep={() => setIndex(index + 1)} />,
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <BackgroundColourAnimation />
        {forms[index]}
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingVertical: 75,
    minHeight: windowHeight,
  },
  buttonsContainer: {
    marginTop: 50,
  },
});
