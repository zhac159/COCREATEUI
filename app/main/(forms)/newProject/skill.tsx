import { ProjectCreateDTO } from "@/api/model";
import { ModalFormFieldWrapper } from "@/common/components/Form/ModalFormFieldWrapper";
import { SkillFormField } from "@/common/components/Form/SkillFormField";
import { SkillFormType } from "@/common/hooks/skills/useSkillForm";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

type SkillRouteParams = {
  roleIndex: string;
};

export default function Skill() {
  const { t } = useTranslation();

  const params = useLocalSearchParams<SkillRouteParams>();
  const roleIndex = parseInt(params.roleIndex, 10);

  const form = useFormContext<ProjectCreateDTO>();

  return (
    <ModalFormFieldWrapper
      title={t("new-project.new-role.skill")}
      description={t("new-project.new-role.skill-placeholder")}
    >
      <Controller
        name={`projectRoles.${roleIndex}.skillType`}
        control={form.control}
        render={({ field }) => (
          <SkillFormField
            skillFormType={SkillFormType.Single}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </ModalFormFieldWrapper>
  );
}
