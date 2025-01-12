import { ProjectCreateDTO } from "@/api/model";
import { postApiProjectBody } from "@/api/zod/coCreateAPI";
import { ImageFormField } from "@/common/components/ImageFormField";
import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
import StyledButton from "@/common/components/StyledComponents/StyledButton";
import { StyledTitle } from "@/common/components/StyledComponents/StyledTitle";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

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
        <StyledButton text={"dsa"} onPress={logFormValues} />
      </ScrollViewWrapper>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});
