import { ProjectRoleDTO } from "@/common/api/model";
import FormFieldWrapper from "@/common/forms/FormFieldWrapper";
import { FormPageProps } from "@/common/forms/MultiStepForm";
import { getRestOfSkills } from "@/components/Account/Skills/skillHelper";
import SkillsAddMenu from "@/components/Account/Skills/SkillsAddMenu";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

type ProjectRoleFormSkillProps = {
  control: Control<ProjectRoleDTO>;
};

const ProjectRoleFormSkill: FC<ProjectRoleFormSkillProps & FormPageProps> = ({
  control,
  nextStep,
}) => {
  const allSkills = getRestOfSkills([]);

  return (
    <Controller
      name="skillType"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormFieldWrapper error={error?.message}>
          <SkillsAddMenu
            restOfTheSkills={allSkills}
            show={true}
            selectSkill={(skillDTO) => {
              onChange(skillDTO.skillType);
              nextStep?.();
            }}
            selectedSkill={value}
          />
        </FormFieldWrapper>
      )}
    />
  );
};

export default ProjectRoleFormSkill;
