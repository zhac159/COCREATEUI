import { useFormWithStep } from "@/common/forms/formsHelper";
import BackgroundColourAnimation from "@/components/Account/BackgroundColourAnimation";
import { windowHeight } from "@/components/Account/Common/getWindowDimensions";
import AddPortofolioForm from "@/components/GetStarted/AddPortofolioForm";
import AddSkillForm from "@/components/GetStarted/AddSkillForm";
import ConfirmEmailTokenForm from "@/components/GetStarted/ConfirmEmailTokenForm";
import LocationForm from "@/components/GetStarted/LocationForm";
import NameAndPasswordForm from "@/components/GetStarted/NameAndPasswordForm";
import SurveyForm from "@/components/GetStarted/SurveyForm";
import TermnsAndConditionsForm from "@/components/GetStarted/TermsAndConditionsForm";
import { Keyboard, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function GetStarted() {
  const { form } = useFormWithStep([
    <SurveyForm />,
    <TermnsAndConditionsForm />,
    <NameAndPasswordForm />,
    <ConfirmEmailTokenForm />,
    <LocationForm />,
    <AddSkillForm />,
    <AddPortofolioForm />,
  ]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <BackgroundColourAnimation />
        {form}
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
