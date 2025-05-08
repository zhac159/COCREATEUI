import { ProjectRoleDTO } from "@/common/api/model";
import { Control, Controller } from "react-hook-form";
import { FC, useRef } from "react";
import { FormPageProps } from "@/common/forms/MultiStepForm";
import FormFieldWrapper from "@/common/forms/FormFieldWrapper";
import StyledButton from "@/components/Common/StyledButton";
import { useTranslation } from "react-i18next";
import { useCoinsValue } from "@/components/RecoilStates/profileState";
import { StyleSheet, TextInput, View } from "react-native";
import Coins from "@/components/Common/Coins";
import StyledText from "@/components/Common/StyledComponents/StyledText";
import { useTheme } from "@/components/Themes/theme";
import CustomTheme from "@/components/Themes/themeType";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

type ProjectRoleCostProps = {
  control: Control<ProjectRoleDTO>;
};

const ProjectRoleCost: FC<ProjectRoleCostProps & FormPageProps> = ({
  control,
  nextStep,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = getStyles(theme);

  const availableCoins = useCoinsValue();

  const coinsRef = useRef<TextInput>(null);

  return (
    <>
      <View style={styles.availableCoins}>
        <StyledText
          content={t("projects.add-role.coins-available")}
          fontSize={22}
          color={theme.colors.darkGray}
          weight="700"
        />
        <Coins coins={availableCoins} showShadow={false} />
      </View>

      <Controller
        control={control}
        name="cost"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <FormFieldWrapper error={error?.message}>
            <TouchableWithoutFeedback
              style={styles.offer}
              onPress={() => {
                coinsRef.current?.focus();
              }}
            >
              <StyledText
                content={t("projects.add-role.offer")}
                fontSize={22}
                color={theme.colors.white}
                weight="700"
              />
              <Coins
                coins={value}
                showShadow={false}
                setCoins={(val) => onChange(val)}
                textInputRef={coinsRef}
              />
            </TouchableWithoutFeedback>
          </FormFieldWrapper>
        )}
      />
      <StyledButton text={t("button.next")} onPress={() => nextStep?.()} />
    </>
  );
};

export default ProjectRoleCost;

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    availableCoins: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 12,
      alignItems: "center",
    },
    offer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: theme.colors.primary,
    },
  });
