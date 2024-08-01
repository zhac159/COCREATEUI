import {
  TextInputProps,
  TextProps,
  Text,
  TextInput,
  View,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";
import { FC, Ref } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "../Themes/theme";
import { useTranslation } from "react-i18next";
import Autolink from "react-native-autolink";
import BackEndErrors from "@/common/api/enum/backEndErrors";

type StyledTextFieldProps = {
  textProps?: TextProps;
  textInputProps?: TextInputProps;
  editable?: boolean;
  fontSize?: number;
  value?: string;
  tooltip?: string;
  error?: BackEndErrors;
  onChangeText?: (text: string) => void;
  href?: boolean;
  textInputRef?: Ref<TextInput>;
};

const StyledTextField: FC<StyledTextFieldProps> = ({
  textProps,
  textInputProps,
  editable = false,
  value,
  fontSize,
  tooltip,
  error,
  onChangeText,
  href,
  textInputRef
}) => {
  const theme = useTheme();

  const { t } = useTranslation();

  const defaultTextInputStyles: StyleProp<TextStyle> = {
    ...theme.customFonts.primary.medium,
    width: "100%",
    backgroundColor: theme.colors.lightGray,
    borderRadius: 7,
    fontSize: fontSize ?? 17,
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlignVertical: "top",
  };

  const defaultTextStyles: StyleProp<TextStyle> = {
    ...theme.customFonts.primary.medium,
    fontWeight: "500",
    fontSize: fontSize ?? 17,
    width: "100%",
    color: theme.colors.black,
  };

  const textComponent = () => {
    if (editable) {
      return (
        <TextInput
          multiline={true}
          numberOfLines={1}
          onChangeText={onChangeText}
          {...textInputProps}
          style={StyleSheet.flatten([
            defaultTextInputStyles,
            textInputProps?.style,
          ])}
          ref={textInputRef}
          value={value}
        />
      );
    } 
    else if (href) {
      return (
        <Autolink
          text={value || ""}
          style={StyleSheet.flatten([defaultTextStyles, textProps?.style])}
          linkStyle={{ color: theme.colors.primary }}
        />
      );
    }
    else {
      return (
        <Text
          {...textProps}
          style={StyleSheet.flatten([defaultTextStyles, textProps?.style])}
        >
          {value}
        </Text>
      );
    }
  };

  return (
    <View
      style={{
        gap: 20,
        width: "100%",
      }}
    >
      {textComponent()}
      {(tooltip || error) && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 10,
            paddingRight: "8%",
          }}
        >
          <FontAwesome6
            name="circle-info"
            size={24}
            color={error ? theme.colors.red : theme.colors.gray}
          />
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              color: error ? theme.colors.red : theme.colors.black,
              fontWeight: "500",
              fontSize: 14,
            }}
          >
            {error ? t(`error.${error}`) : tooltip}
          </Text>
        </View>
      )}
    </View>
  );
};

export default StyledTextField;
