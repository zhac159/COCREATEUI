import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { useTranslation } from "react-i18next";
import StyledButton from "@/common/components/StyledComponents/StyledButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GoBackButton } from "@/common/components/GoBackButton";

type SubmitAndReturnProps = {
  onSubmit: () => void;
};

export const SubmitAndReturn: FC<SubmitAndReturnProps> = ({ onSubmit }) => {
  const { t } = useTranslation();

  const { top } = useSafeAreaInsets();
  const styles = useThemedStyles((theme) => getStyles(theme, top));

  return (
    <View style={styles.container}>
      <StyledButton
        onPress={onSubmit}
        icon="check"
        text={t("new-project.publish")}
        style={styles.submitButton}
        iconStyle={styles.buttonText}
        textStyle={styles.buttonText}
      />
      <GoBackButton xVariant />
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
