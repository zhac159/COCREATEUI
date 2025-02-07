import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { UserUpdateDTO } from "@/api/model";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import StyledText from "@/common/components/StyledComponents/StyledText";
import { PortoflioContent } from "./PortofolioContent";
import { ImageFormField } from "@/common/components/Form/ImageFormField";

type PortofolioProps = {};

export const Portofolio: FC<PortofolioProps> = ({}) => {
  const styles = useThemedStyles(getStyles);
  const { t } = useTranslation();

  const { control } = useFormContext<UserUpdateDTO>();
  return (
    <View style={styles.container}>
      <StyledText text={t("edit-profile.portfolio")} style={styles.title} />
      <Controller
        name="portfolioMedias"
        control={control}
        render={({ field: { value, onChange } }) => (
          <View style={styles.imagesContainer}>
            {value?.map((_, index) => (
              <PortoflioContent key={index} index={index} />
            ))}
            {(!value || value.length < 9) && (
              <ImageFormField
                onChange={(newMedia) => {
                  console;
                  onChange([...(value || []), newMedia]);
                }}
                style={styles.imageFormField}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      aspectRatio: 1,
    },
    title: {
      fontWeight: "700",
      fontSize: 18,
    },
    imageFormField: {
      width: "32%",
      borderWidth: 0,
      backgroundColor: theme.colors.white,
    },
    imagesContainer: {
      flexDirection: "row",
      width: "100%",
      flexWrap: "wrap",
      gap: 6,
    },
  });
