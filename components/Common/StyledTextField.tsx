import { TextInputProps, TextProps, Text, TextInput, View } from "react-native";
import { FC } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "../Themes/theme";
import { useTranslation } from "react-i18next";
import BackEndErrors from "@/common/api/enum/backEndErrors";

type StyledTextFieldProps = {
  textProps?: TextProps;
  textInputProps?: TextInputProps;
  editable?: boolean;
  value?: string;
  tooltip?: string;
  error?: BackEndErrors;
};

const StyledTextField: FC<StyledTextFieldProps> = ({
  textProps,
  textInputProps,
  editable = false,
  value,
  tooltip,
  error,
}) => {
  const theme = useTheme();

  const { t } = useTranslation();

  return (
    <View
      style={{
        gap: 20,
      }}
    >
      {editable ? (
        <TextInput {...textInputProps} value={value} />
      ) : (
        <Text {...textProps}>{value}</Text>
      )}
      {(tooltip || error) && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <FontAwesome6
            name="circle-info"
            size={24}
            color={error ? theme.colors.red : theme.colors.black}
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
