import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { UserUpdateDTO } from "@/api/model";
import { ImageFormField } from "@/common/components/Form/ImageFormField";
import { DeleteButton } from "@/common/components/DeleteButton";

type PortfolioContentProps = {
  index: number;
};

export const PortfolioContent: FC<PortfolioContentProps> = ({ index }) => {
  const styles = useThemedStyles(getStyles);
  const { control } = useFormContext<UserUpdateDTO>();

  const { remove } = useFieldArray({
    control,
    name: "portfolioMedias",
  });

  return (
    <View style={styles.image}>
      <DeleteButton
        onPress={() => {
          remove(index);
        }}
        style={styles.deleteButton}
      />
      <Controller
        name={`portfolioMedias.${index}`}
        control={control}
        render={({ field: { value, onChange } }) => (
          <ImageFormField value={value} onChange={onChange} />
        )}
      />
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    image: {
      width: "32%",
    },
    deleteButton: {
      position: "absolute",
      top: -5,
      right: -5,
      zIndex: 100,
    },
  });
