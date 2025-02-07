import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GoBackButton } from "@/common/components/GoBackButton";
import { PublishButton } from "@/common/components/PublishButton";
import { StyledButtonProps } from "@/common/components/StyledComponents/StyledButton";

type SubmitAndReturnProps = Omit<
  StyledButtonProps,
  "text" | "onPress" | "icon"
> & {
  isSubmitting?: boolean;
  onSubmit: () => void;
};

export const SubmitAndReturn: FC<SubmitAndReturnProps> = ({
  onSubmit,
  isSubmitting,
  style,
  error,
  textStyle,
  iconStyle,
  ...props
}) => {
  const { t } = useTranslation();

  const { top } = useSafeAreaInsets();
  const styles = useThemedStyles((theme) => getStyles(theme, top));

  return (
    <View style={styles.container}>
      <GoBackButton />
      <PublishButton
        onPress={onSubmit}
        isSubmitting={isSubmitting}
        text={t("new-project.publish")}
        style={[styles.submitButton, style]}
        error={error}
        textStyle={[styles.buttonText, textStyle]}
        iconStyle={iconStyle}
        {...props}
      />
    </View>
  );
};

const getStyles = (theme: Theme, safeAreaInset: number) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      flexDirection: "row",
      alignItems: "center",
      top: safeAreaInset,
      gap: 10,
      right: 20,
      zIndex: 1000,
    },
    buttonText: {
      fontWeight: "900",
      color: theme.colors.black,
    },
    submitButton: {
      backgroundColor: theme.colors.green,
      elevation: 8,
      paddingHorizontal: 13,
      paddingVertical: 8,
      borderRadius: 11,
    },
  });
