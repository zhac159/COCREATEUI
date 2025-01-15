import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { ProjectCreateDTO } from "@/api/model";
import { ProjectRoleForm } from "./ProjectRoleForm";
import { AddButton } from "@/common/components/AddButton";
import { useTranslation } from "react-i18next";
import StyledText from "@/common/components/StyledComponents/StyledText";
import { useGetNewProjectDefaultValues } from "./hooks/useGetNewProjectDefaultValues";

type ProjectRoleFormsProps = {};

export const ProjectRoleForms: FC<ProjectRoleFormsProps> = ({}) => {
  const { t } = useTranslation();
  const { defaultRole } = useGetNewProjectDefaultValues();
  const { control } = useFormContext<ProjectCreateDTO>();
  return (
    <View style={styles.container}>
      <StyledText text={t("new-project.roles")} style={styles.roles} />
      <Controller
        name="projectRoles"
        control={control}
        render={({ field: { value } }) => (
          <>
            {value?.map((_, index) => (
              <ProjectRoleForm key={index} index={index} />
            ))}
          </>
        )}
      />
      <Controller
        name="projectRoles"
        control={control}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    gap: 26,
  },
  roles: {
    alignSelf: "center",
    fontWeight: "700",
    fontSize: 25,
  },
});
