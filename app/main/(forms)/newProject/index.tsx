import { ProjectCreateDTO, ProjectRoleCreateDTO } from "@/api/model";
import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
import { StyledTitle } from "@/common/components/StyledComponents/StyledTitle";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import StyledText from "@/common/components/StyledComponents/StyledText";
import { ProjectRoleForm } from "@/components/Main/Forms/NewProject/ProjectRoleForm";
import { AddButton } from "@/common/components/AddButton";
import { ProjectForm } from "@/components/Main/Forms/NewProject/ProjectForm";
import StyledButton from "@/common/components/StyledComponents/StyledButton";

const defaultRole: ProjectRoleCreateDTO = {
  cost: 0,
  description: "",
  name: "",
  remote: false,
  skillType: 1,
};

export default function Index() {
  const { t } = useTranslation();

  const form = useFormContext<ProjectCreateDTO>();

  return (
    <ScrollViewWrapper
      contentContainerStyle={styles.container}
      header={<StyledTitle text={t("new-project.main-title")} />}
    >
      <ProjectForm />
      <StyledText text={t("new-project.roles")} style={styles.roles} />
      <Controller
        name="projectRoles"
        control={form.control}
        render={({ field: { value } }) => (
          <>
            {value?.map((_, index) => (
              <ProjectRoleForm
                key={index}
                index={index}
              />
            ))}
          </>
        )}
      />
      <Controller
        name="projectRoles"
        control={form.control}
        render={({ field }) => (
          <AddButton
            text={t("new-project.new-role.add-role")}
            onPress={() => {
              const currentValue = field?.value || [];
              field.onChange([...currentValue, defaultRole]);
            }}
          />
        )}
      />
    </ScrollViewWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 26,
    paddingHorizontal: "4%",
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
