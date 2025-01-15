import { ProjectCreateDTO } from "@/api/model";
import { ModalFormFieldWrapper } from "@/common/components/Form/ModalFormFieldWrapper";
import { StyledTextInput } from "@/common/components/StyledComponents/StyledTextInput";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { Theme } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

type PaymentRouteParams = {
  roleIndex: string;
};

export default function Payment() {
  const { t } = useTranslation();
  const styles = useThemedStyles(getStyles);

  const params = useLocalSearchParams<PaymentRouteParams>();
  const roleIndex = parseInt(params.roleIndex, 10);

  const form = useFormContext<ProjectCreateDTO>();

  return (
    <ModalFormFieldWrapper
      title={t("new-project.new-role.payment")}
      description={t("new-project.new-role.payment-placeholder")}
    >
      <Controller
        name={`projectRoles.${roleIndex}.cost`}
        control={form.control}
        render={({ field }) => (
          <StyledTextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={field.onChange}
            value={field.value.toString()}
          />
        )}
      />
    </ModalFormFieldWrapper>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    textInput: {
      textAlign: "right",
      backgroundColor: theme.colors.backgroundColor,
      fontSize: 24,
      fontWeight: "bold",
    },
  });
