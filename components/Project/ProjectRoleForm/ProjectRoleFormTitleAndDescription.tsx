import { ProjectRoleDTO } from "@/common/api/model";
import { Control, Controller } from "react-hook-form";
import { FC } from "react";
import { FormPageProps } from "@/common/forms/MultiStepForm";
import FormFieldWrapper from "@/common/forms/FormFieldWrapper";
import StyledTextField from "@/components/Common/StyledTextField";
import StyledButton from "@/components/Common/StyledButton";
import { useTranslation } from "react-i18next";

type ProjectRoleTitleAndDescriptionProps = {
  control: Control<ProjectRoleDTO>;
};

const ProjectRoleTitleAndDescription: FC<
  ProjectRoleTitleAndDescriptionProps & FormPageProps
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
                placeholder: t("projects.add-role.title-placeholder"),
              }}
              editable={true}
              tooltip={t("projects.add-role.title-tooltip")}
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
                placeholder: t("projects.add-role.description-placeholder"),
              }}
              editable={true}
              tooltip={t("projects.add-role.description-tooltip")}
            />
          </FormFieldWrapper>
        )}
      />
      <StyledButton text={t("button.next")} onPress={() => nextStep?.()} />
    </>
  );
};

export default ProjectRoleTitleAndDescription;
