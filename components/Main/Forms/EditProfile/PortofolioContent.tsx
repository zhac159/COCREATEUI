import { FC } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { Controller, useFormContext } from "react-hook-form";
import { UserUpdateDTO } from "@/api/model";
import { ImageFormField } from "@/common/components/Form/ImageFormField";

type PortoflioContentProps = {
  index: number;
};

export const PortoflioContent: FC<PortoflioContentProps> = ({ index }) => {
  const styles = useThemedStyles(getStyles);
  const { control } = useFormContext<UserUpdateDTO>();

  return (
    <Controller
      name={`portfolioMedias.${index}`}
      control={control}
      render={({ field: { value, onChange } }) => (
        <ImageFormField
          value={value}
          onChange={onChange}
          style={styles.image}
        />
      )}
    />
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    image: {
      width: "32%",
    },
  });
