import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { UserUpdateDTO } from "@/api/model";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ImageFormField } from "@/common/components/Form/ImageFormField";
import { StyledTextInput } from "@/common/components/StyledComponents/StyledTextInput";

type ProfilePictureUsernameDescriptionProps = {};

export const ProfilePictureUsernameDescription: FC<
  ProfilePictureUsernameDescriptionProps
> = ({}) => {
  const { t } = useTranslation();
  const styles = useThemedStyles(getStyles);
  const { control } = useFormContext<UserUpdateDTO>();

  return (
    <View style={styles.container}>
      <View style={styles.pictureNameContainer}>
        <Controller
          name="profilePicture"
          control={control}
          render={({ field: { value, onChange } }) => (
            <ImageFormField
              value={value}
              onChange={onChange}
              style={styles.imageContainer}
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <StyledTextInput
              onChangeText={field.onChange}
              value={field.value}
              error={error?.message}
              placeholder={t("edit-profile.username-placeholder")}
              style={styles.textField}
            />
          )}
        />
      </View>
      <Controller
        name="aboutYou"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <StyledTextInput
            onChangeText={field.onChange}
            value={field.value}
            error={error?.message}
            style={styles.description}
            placeholder={t("edit-profile.about-you-placeholder")}
            multiline
            numberOfLines={10}
          />
        )}
      />
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 20,
    },
    pictureNameContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: "2%",
    },
    description: {
      paddingVertical: 10,
      minHeight: 200,
    },
    textField: {
      width: "69%",
    },
    imageContainer: {
      width: "29%",
      aspectRatio: 1,
      borderRadius: 300,
    },
  });
