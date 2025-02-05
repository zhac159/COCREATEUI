import { SkillType, SkillUpdateDTO, UserUpdateDTO } from "@/api/model";
import { ModalFormFieldWrapper } from "@/common/components/Form/ModalFormFieldWrapper";
import { SkillFormField } from "@/common/components/Form/SkillFormField";
import { SkillFormType } from "@/common/hooks/skills/useSkillForm";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function Skills() {
  const { t } = useTranslation();
  const { control } = useFormContext<UserUpdateDTO>();

  const transformSkills = (value: SkillType[]): SkillUpdateDTO[] => {
    return value.map((skillType) => ({
      skillType: skillType,
      skillGroupType: 0,
    }));
  };

  return (
    <ModalFormFieldWrapper
      title={t("new-project.new-role.skill")}
      description={t("new-project.new-role.skill-placeholder")}
    >
      <Controller
        name={`skills`}
        control={control}
        render={({ field: { value, onChange } }) => (
          <SkillFormField
            skillFormType={SkillFormType.Multiple}
            value={value?.map((skill) => skill?.skillType) || []}
            onChange={(skillType) => onChange(transformSkills(skillType))}
          />
        )}
      />
    </ModalFormFieldWrapper>
  );
}
