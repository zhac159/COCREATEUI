import { ProjectCreateDTO } from "@/api/model";
import { postApiProjectBody } from "@/api/zod/coCreateAPI";
import { ImageFormField } from "@/common/components/ImageFormField";
import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
import StyledButton from "@/common/components/StyledComponents/StyledButton";
import { StyledTextInput } from "@/common/components/StyledComponents/StyledTextInput";
import { StyledTitle } from "@/common/components/StyledComponents/StyledTitle";
import { router, Stack } from "expo-router";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Modal, StyleSheet } from "react-native";

export default function NewProject() {
  const { t } = useTranslation();

  const refinedSchema = postApiProjectBody
    .extend({})
    .refine((data) => data.address.length === 0, {
      message: "Passwords do not match",
      path: ["password"],
    });

  const form = useForm<ProjectCreateDTO>();

  const logFormValues = () => {
    console.log(form.getValues());
    router.push("/main/(forms)/test");
  };

  return (
    <FormProvider {...form}>
      <ScrollViewWrapper contentContainerStyle={styles.container}>
        <StyledTitle text={t("new-project.main-title")} />
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
        <StyledButton text={"dsa"} onPress={logFormValues} />
        <Controller
          name="description"
          control={form.control}
          render={({ field }) => (
            <StyledTextInput
              label={t("new-project.description")}
              placeholder={t("new-project.description-placeholder")}
              onChangeText={field.onChange}
              multiline
              numberOfLines={4}
              value={field.value}
              style={styles.description}
            />
          )}
        />
      </ScrollViewWrapper>
      <Modal
        visible={true}
        animationType="slide"
        style={{ backgroundColor: "red" }}
        
      >
        <StyledButton text={"dsa"} onPress={logFormValues} />
      </Modal>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingHorizontal: "4%",
  },
  description: {
    minHeight: 200,
    paddingVertical: 10,
  },
});
