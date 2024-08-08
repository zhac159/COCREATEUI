import { FC } from "react";
import CustomTheme from "@/components/Themes/themeType";
import { StyleSheet, View } from "react-native";
import StyledButton from "@/components/Common/StyledButton";
import useNewPortofolioContentForm from "./useNewPortofolioContentForm";
import { useTheme } from "@/components/Themes/theme";

type PortoflioAddContentFormProps = {
  onClose: () => void;
};

const PortofolioAddContentForm: FC<PortoflioAddContentFormProps> = ({
  onClose,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

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
          text="Done"
          onPress={async () => {
            await submitCreate();
          }}
          style={styles.doneButton}
          isLoading={createIsLoading}
        />
        <StyledButton
          text="Cancel"
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
