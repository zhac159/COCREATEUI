import { FC } from "react";
import CustomTheme from "@/components/Themes/themeType";
import { StyleSheet, View } from "react-native";
import StyledButton from "@/components/Common/StyledButton";
import useNewPortofolioContentForm from "./useNewPortofolioContentForm";
import useThemedStyles from "@/components/Common/StyledComponents/hooks/useThemedStyles";
import { useTranslation } from "react-i18next";

type PortoflioAddContentFormProps = {
  onClose: () => void;
};

const PortofolioAddContentForm: FC<PortoflioAddContentFormProps> = ({
  onClose,
}) => {
  const styles = useThemedStyles(getStyles);
  const {t} = useTranslation();

  const {
    FormNode: NewPortofolioContentForm,
    handleCreate: submitCreate,
    isLoading: createIsLoading,
    reset,
  } = useNewPortofolioContentForm(() => {
    onClose();
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <StyledButton
          text={t("button.done")}
          onPress={async () => {
            await submitCreate();
          }}
          style={styles.doneButton}
          isLoading={createIsLoading}
        />
        <StyledButton
          text={t("button.cancel")}
          onPress={() => {
            onClose();
            reset();
          }}
          style={styles.cancelButton}
        />
      </View>
      {NewPortofolioContentForm}
    </View>
  );
};

export default PortofolioAddContentForm;

const getStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    buttonContainer: {
      flexDirection: "row",
      alignSelf: "flex-end",
      gap: 10,
    },
    container: {
      flex: 1,
      flexGrow: 1,
      justifyContent: "flex-start",
    },
    doneButton: {
      marginTop: 10,
      marginBottom: "15%",
      backgroundColor: theme.colors.primary,
    },
    cancelButton: {
      marginTop: 10,
      marginBottom: "15%",
      backgroundColor: theme.colors.red,
    },
  });
