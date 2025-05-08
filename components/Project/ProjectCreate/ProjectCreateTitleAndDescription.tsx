import { ProjectCreateDTO } from "@/common/api/model";
import FormFieldWrapper from "@/common/forms/FormFieldWrapper";
import { FormPageProps } from "@/common/forms/MultiStepForm";
import StyledButton from "@/components/Common/StyledButton";
import StyledTextField from "@/components/Common/StyledTextField";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

type ProjectCreateTitleAndDescriptionProps = {
  control: Control<ProjectCreateDTO, any>;
};

const ProjectCreateTitleAndDescription: FC<
  ProjectCreateTitleAndDescriptionProps & FormPageProps
> = ({ control, nextStep }) => {
  const { t } = useTranslation();

  return (
    <>
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <FormFieldWrapper error={error?.message}>
            <StyledTextField
              value={value}
              textInputProps={{
                numberOfLines: 5,
                multiline: true,
                onChangeText: onChange,
                placeholder: t("projects.create-project.title-placeholder"),
              }}
              editable={true}
              tooltip={t("projects.create-project.title-tooltip")}
            />
          </FormFieldWrapper>
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <FormFieldWrapper error={error?.message}>
            <StyledTextField
              value={value}
              textInputProps={{
                numberOfLines: 14,
                multiline: true,
                onChangeText: onChange,
                placeholder: t(
                  "projects.create-project.description-placeholder"
                ),
              }}
              editable={true}
              tooltip={t("projects.create-project.description-tooltip")}
            />
          </FormFieldWrapper>
        )}
      />
      <StyledButton text={t('button.next')} onPress={() => nextStep?.()} />
    </>
  );
};

export default ProjectCreateTitleAndDescription;
