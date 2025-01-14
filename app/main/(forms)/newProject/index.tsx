import { ProjectCreateDTO } from "@/api/model";
import { ModalFormRedirectButton } from "@/common/components/Form/ModalFormRedirectButton";
import { ImageFormField } from "@/common/components/Form/ImageFormField";
import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
import { StyledTextInput } from "@/common/components/StyledComponents/StyledTextInput";
import { StyledTitle } from "@/common/components/StyledComponents/StyledTitle";
import { StackPositions } from "@/common/constants/stackPostitions";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const { t } = useTranslation();

  const form = useFormContext<ProjectCreateDTO>();

  return (
    <FormProvider {...form}>
      <ScrollViewWrapper
        contentContainerStyle={styles.container}
        header={<StyledTitle text={t("new-project.main-title")} />}
      >
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
            name="location.address"
            control={form.control}
            render={({ field }) => (
              <ModalFormRedirectButton
                icon="location-dot"
                text={t("new-project.location")}
                value={field.value}
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
      </ScrollViewWrapper>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingHorizontal: "4%",
  },
  description: {
    paddingVertical: 10,
    minHeight: 200,
  },
});
