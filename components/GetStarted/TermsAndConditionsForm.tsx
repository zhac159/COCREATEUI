import { FormPageProps } from "@/common/forms/formsHelper";
import { FC, useState } from "react";
import { View } from "react-native-animatable";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "../Themes/theme";
import { useTranslation } from "react-i18next";
import { IconButton } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";
import StyledButton from "../Common/StyledButton";
import { TermsAndConditions } from "../Account/Settings/TermsAndConditions";

const TermnsAndConditionsForm: FC<FormPageProps> = ({ nextStep }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const terms = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const [checkedStates, setCheckedStates] = useState<Boolean[]>(
    Array(terms.length).fill(false)
  );

  const handlePress = (index: number) => {
    const updatedCheckedStates = [...checkedStates];
    updatedCheckedStates[index] = !updatedCheckedStates[index];
    setCheckedStates(updatedCheckedStates);
  };

  const termsWithCheckboxes = terms.map((term, index) => {
    return (
      <View
        key={term}
        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
      >
        <IconButton
          icon={() => (
            <FontAwesome6
              name={checkedStates[index] ? "check-square" : "square"}
              size={20}
              color={theme.colors.primary}
            />
          )}
          size={20}
          hitSlop={20}
          onPress={() => handlePress(index)}
          style={{
            margin: "-3%",
            padding: 0,
            alignSelf: "flex-start",
            marginTop: -8,
          }}
        />
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            fontWeight: "900",
            maxWidth: "90%",
            fontSize: 12,
          }}
        >
          {`${index < terms.length - 1 ? `${index + 1}. ` : ""}${t(`get-started.terms-and-conditions.terms.${term as "1"}`)}`}
        </Text>
      </View>
    );
  });

  const isAllChecked = checkedStates.every((state) => state);

  return (
    <View
      animation="fadeIn"
      style={{ flex: 1, paddingHorizontal: "5%", gap: 20 }}
    >
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          fontSize: 35,
          fontWeight: "400",
        }}
      >
        {t("get-started.terms-and-conditions.title")}
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          fontWeight: "400",
        }}
      >
        {t("get-started.terms-and-conditions.description")}
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          color: theme.colors.primary,
          fontWeight: "400",
        }}
      >
        {t("get-started.terms-and-conditions.check-boxes-title")}
      </Text>
      {termsWithCheckboxes}
      <StyledButton
        text="Next"
        onPress={() => nextStep?.()}
        style={{
          backgroundColor: isAllChecked
            ? theme.colors.primary
            : theme.colors.secondary,
        }}
        icon="arrow-right"
        disabled={!isAllChecked}
      />
      <TermsAndConditions />
    </View>
  );
};

export default TermnsAndConditionsForm;

const styles = StyleSheet.create({});
