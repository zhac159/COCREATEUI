import { FC } from "react";
import { useGetMedia } from "../../hooks/useGetMedia";
import { StyledImage } from "../StyledComponents/StyledImage";
import { View, StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "../../theme/getThemedStylesheet";
import StyledIconButton from "../StyledComponents/StyledIconButton";
import StyledText from "../StyledComponents/StyledText";
import { useTranslation } from "react-i18next";
import { Control, Controller } from "react-hook-form";

type ImageFormFieldProps = {
  description?: string;
  name: string;
  control: Control<any>;
};

export const ImageFormField: FC<ImageFormFieldProps> = ({
  description,
  control,
  name,
}) => {
  const style = useThemedStyles(getStyles);
  const { pickImage } = useGetMedia();
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <View style={style.container}>
          {value && (
            <StyledImage
              source={{ uri: value.uri }}
              style={style.styledImage}
              loadingStyle={style.loading}
            />
          )}
          <StyledIconButton
            iconName="image"
            onPress={async () => {
              const result = await pickImage();
              if (result) {
                onChange({
                  ...value,
                  uri: result.uri,
                  mediaType: result.type,
                });
              }
            }}
          />
          {!value && (
            <>
              <StyledText text={t("new-project.project-image")} />
              {description && (
                <StyledText text={description} style={style.description} />
              )}
            </>
          )}
        </View>
      )}
    />
  );
};
const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      height: 328,
      borderColor: theme.colors.black,
      borderWidth: 1,
      borderRadius: 15,
    },
    description: {
      color: theme.colors.grayer,
      fontSize: 13,
      width: "50%",
      textAlign: "center",
    },
    loading: { borderRadius: 15 },
    styledImage: {
      position: "absolute",
      width: "105%",
      height: "105%",
      borderRadius: 15,
    },
  });
