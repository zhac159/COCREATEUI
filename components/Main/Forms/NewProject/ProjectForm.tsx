import { ProjectCreateDTO } from "@/api/model";
import { ModalFormRedirectButton } from "@/common/components/Form/ModalFormRedirectButton";
import { ImageFormField } from "@/common/components/Form/ImageFormField";
import { StyledTextInput } from "@/common/components/StyledComponents/StyledTextInput";
import { StackPositions } from "@/common/constants/stackPostitions";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { FC } from "react";

type ProjectFormProps = {};

export const ProjectForm: FC<ProjectFormProps> = ({}) => {
  const form = useFormContext<ProjectCreateDTO>();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ImageFormField
        description={t("new-project.project-image-placeholder")}
        name="medias.0"
        control={form.control}
      />
      <Controller
        name="name"
        control={form.control}
        render={({ field }) => (
          <StyledTextInput
            label={t("new-project.title")}
            placeholder={t("new-project.title-placeholder")}
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />
      <Controller
        name="description"
        control={form.control}
        render={({ field }) => (
          <StyledTextInput
            label={t("new-project.description")}
            placeholder={t("new-project.description-placeholder")}
            onChangeText={field.onChange}
            multiline
            numberOfLines={10}
            value={field.value}
            style={styles.description}
          />
        )}
      />
      <View>
        <Controller
          name="location"
          control={form.control}
          render={({ field: { value } }) => (
            <ModalFormRedirectButton
              icon="location-dot"
              text={t("new-project.location")}
              value={value?.address || ""}
              modalRoute="/main/(forms)/newProject/location"
              stackPosition={StackPositions.TOP}
            />
          )}
        />
        <Controller
          name="date"
          control={form.control}
          render={({ field }) => (
            <ModalFormRedirectButton
              icon="calendar"
              text={t("new-project.date")}
              value={field.value}
              modalRoute="/main/(forms)/newProject/cost"
              stackPosition={StackPositions.BOTTOM}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 26,
  },
  description: {
    paddingVertical: 10,
    minHeight: 200,
  },
  roles: {
    alignSelf: "center",
    fontWeight: "700",
    fontSize: 25,
  },
});
