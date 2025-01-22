import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
import { StyledTitle } from "@/common/components/StyledComponents/StyledTitle";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { ProjectForm } from "@/components/Main/Forms/NewProject/ProjectForm";
import { ProjectRoleForms } from "@/components/Main/Forms/NewProject/ProjectRoleForms";
import { useFormContext } from "react-hook-form";
import { ProjectUpdateDTO } from "@/api/model";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { SubmitAndReturn } from "@/components/Main/Forms/NewProject/SubmitAndReturn";
import { useCallback, useState } from "react";
import {
  usePostApiProject,
  usePostApiProjectUpdate,
} from "@/api/endpoints/cocreateApi";
import { router } from "expo-router";
import { useAuthStore } from "@/common/stores/authStore/authStore";

export default function Index() {
  const { t } = useTranslation();
  const addProject = useAuthStore((state) => state.addProject);

  const styles = useThemedStyles(getStyles);
  const [error, setError] = useState(false);

  const { mutate: createProject } = usePostApiProject({
    mutation: {
      onSuccess: (data) => {
        addProject(data);
      },
    },
  });

  const { mutate: updateProject } = usePostApiProjectUpdate();
  const { handleSubmit } = useFormContext<ProjectUpdateDTO>();

  const onSubmit = useCallback(() => {
    handleSubmit(
      (data) => {
        data.id ? updateProject({ data }) : createProject({ data });
        router.navigate("/main/(tabs)/account");
      },
      () => {
        setError(true);
      }
    )();
  }, [handleSubmit]);

  return (
    <ScrollViewWrapper
      disableTopInset
      contentContainerStyle={styles.container}
      header={<StyledTitle text={t("new-project.main-title")} />}
      StickyHeaderComponent={() => (
        <SubmitAndReturn onSubmit={onSubmit} error={error} />
      )}
    >
      <ProjectForm />
      <ProjectRoleForms />
    </ScrollViewWrapper>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 26,
      paddingHorizontal: "4%",
      backgroundColor: theme.colors.backgroundColor,
    },
  });
