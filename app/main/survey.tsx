import BackgroundColourAnimation from "@/components/Account/BackgroundColourAnimation";
import SurveyForm from "@/components/GetStarted/SurveyForm";
import { router } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React from "react";
import { StyleSheet, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import SecureStoreKeys from "@/common/api/enum/secureStoreKeys";
import { windowHeight } from "@/components/Account/Common/getWindowDimensions";
import { useUserIdValue } from "@/components/RecoilStates/profileState";

export default function Survey() {
  const surveyId = 2;
  const userId = useUserIdValue();
  const nextStep = async () => {
    await SecureStore.setItemAsync(
      SecureStoreKeys.COMPLETED_20_AUGUST_SURVEY + userId,
      "true"
    );
    router.replace("/main/(tabs)/account");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <BackgroundColourAnimation />
      <SurveyForm formId={surveyId} nextStep={nextStep} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingVertical: 75,
    minHeight: windowHeight,
  },
});
