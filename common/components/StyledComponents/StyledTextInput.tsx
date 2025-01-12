import { FC } from "react";
import { TextInputProps, View, StyleSheet, TextInput } from "react-native";
import StyledText from "./StyledText";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { InformationMessage } from "../InformationMessage";

interface StyledTextInputProps extends TextInputProps {
  error?: string;
  label: string;
}

export const StyledTextInput: FC<StyledTextInputProps> = ({
  error,
  label,
  ...props
}) => {
  const styles = useThemedStyles(getStyles);

  return (
    <View style={styles.container}>
      <StyledText text={label} />
      <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={1}
        {...props}
      />
      {error && <InformationMessage type="error" message={error} />}
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 10,
    },
    textInput: {
      ...theme.customFonts.primary.medium,
      width: "100%",
      backgroundColor: theme.colors.white,
      borderRadius: 7,
      fontSize: 14,
      paddingVertical: 10,
      paddingHorizontal: 10,
      textAlignVertical: "top",
    },
  });
