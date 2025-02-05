import { FC } from "react";
import { TextInputProps, View, StyleSheet, TextInput } from "react-native";
import StyledText from "./StyledText";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { InformationMessage } from "../InformationMessage";

type StyledTextInputProps = TextInputProps & {
  error?: string;
  label?: string;
};

export const StyledTextInput: FC<StyledTextInputProps> = ({
  error,
  label,
  style,
  ...props
}) => {
  const styles = useThemedStyles(getStyles);

  return (
    <View style={styles.container}>
      {label && <StyledText text={label} />}
      <TextInput
        style={[styles.textInput, style]}
        multiline={true}
        numberOfLines={1}
        placeholderTextColor={styles.placeHolderTextColors.color}
        {...props}
      />
      {error && <InformationMessage type="error" message={error} />}
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      gap: 10,
    },
    textInput: {
      ...theme.customFonts.primary.medium,
      backgroundColor: theme.colors.white,
      width: "100%",
      textAlignVertical: "top",
      borderRadius: 15,
      fontSize: 14,
      paddingVertical: 15,
      paddingHorizontal: 10,
    },
    placeHolderTextColors: {
      color: theme.colors.grayer,
    },
  });
