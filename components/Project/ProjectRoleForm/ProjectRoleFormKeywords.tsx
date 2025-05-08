import { ProjectRoleDTO } from "@/common/api/model";
import { Control, Controller } from "react-hook-form";
import { FC } from "react";
import { FormPageProps } from "@/common/forms/MultiStepForm";
import FormFieldWrapper from "@/common/forms/FormFieldWrapper";
import StyledTextField from "@/components/Common/StyledTextField";
import StyledButton from "@/components/Common/StyledButton";
import { useTranslation } from "react-i18next";

type ProjectRoleKeywordsProps = {
  control: Control<ProjectRoleDTO>;
};

const ProjectRoleKeywords: FC<ProjectRoleKeywordsProps & FormPageProps> = ({
  control,
  nextStep,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Controller
        control={control}
        name="keywords"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <FormFieldWrapper error={error?.message}>
            <StyledTextField
              value={value.join(", ")}
              textInputProps={{
                numberOfLines: 5,
                multiline: true,
                onChangeText: (text) => {
                  onChange(text.split(", "));
                },
                placeholder: t("projects.add-role.keywords-placeholder"),
              }}
              editable={true}
              tooltip={t("projects.add-role.keywords-tooltip")}
            />
          </FormFieldWrapper>
        )}
      />
      <StyledButton text={t("button.next")} onPress={() => nextStep?.()} />
    </>
  );
};

export default ProjectRoleKeywords;
