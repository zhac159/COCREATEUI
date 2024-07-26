import { FormPageProps } from "@/common/forms/formsHelper";
import { FC, useMemo, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import OpinionSlider from "./OpinionSlider";
import { useTheme } from "../Themes/theme";
import { useTranslation } from "react-i18next";
import StyledButton from "../Common/StyledButton";
import { usePostApiSurveyAnswerCreateList } from "@/common/api/endpoints/cocreateApi";
import {
  CreateSurveyAnswerDTO,
  CreateSurveyAnswerListDTO,
  SurveyAnswerListDTO,
} from "@/common/api/model";
import { useUserIdValue } from "../RecoilStates/profileState";

type QuestionValuesType = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
};

const SurveyForm: FC<FormPageProps> = ({ nextStep }) => {
  const userId = useUserIdValue();

  const [questionValues, setQuestionValues] = useState<QuestionValuesType>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
  });

  const theme = useTheme();
  const { t } = useTranslation();

  const { mutate: submitSurvey } = usePostApiSurveyAnswerCreateList();

  const handleSubmit = () => {
    var submission: CreateSurveyAnswerListDTO = { surveyAnswers: [] };

    submission.surveyAnswers = Object.keys(questionValues).map((key) => {
      const numericKey = parseInt(key);
      const value = questionValues[key as unknown as keyof QuestionValuesType];

      const surveyAnswer: CreateSurveyAnswerDTO = {
        answer: (Math.round(value * 2) / 2).toString(),
        questionId: numericKey,
        surveyId: 1,
        userId: userId,
      };

      return surveyAnswer;
    });

    console.log(submission);




    submitSurvey({
      data: submission,
    });

    nextStep?.();
  };
  const opinionSliders = useMemo(
    () =>
      Object.keys(questionValues).map((key) => (
        <OpinionSlider
          key={key}
          onValueChange={(value) => {
            setQuestionValues((prev) => ({
              ...prev,
              [key]: value,
            }));
          }}
          opinionIndex={parseInt(key)}
        />
      )),
    [
      questionValues,
      setQuestionValues,
    ]
  );

  return (
    <View
      style={{
        ...styles.container,
      }}
      animation="fadeIn"
    >
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          color: theme.colors.black,
          fontWeight: "400",
          fontSize: 40,
        }}
      >
        {t("get-started.survey.title")}
      </Text>
      {opinionSliders}
      <StyledButton
        text="Next"
        onPress={() => handleSubmit()}
        icon="arrow-right"
      />
    </View>
  );
};

export default SurveyForm;

const styles = StyleSheet.create({
  container: { paddingHorizontal: "5%", gap: 100 },
});
