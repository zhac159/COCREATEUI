import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
import { StyledTitle } from "@/common/components/StyledComponents/StyledTitle";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { ProjectForm } from "@/components/Main/Forms/NewProject/ProjectForm";
import { ProjectRoleForms } from "@/components/Main/Forms/NewProject/ProjectRoleForms";
import { useFormContext } from "react-hook-form";
import { ProjectCreateDTO } from "@/api/model";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { SubmitAndReturn } from "@/components/Main/Forms/NewProject/SubmitAndReturn";

export default function Index() {
  const { t } = useTranslation();

  const styles = useThemedStyles(getStyles);

  const { handleSubmit } = useFormContext<ProjectCreateDTO>();

  const logValuyes = () => {
    handleSubmit((data) => {
      console.log(data);
    })();
  };

  return (
    <ScrollViewWrapper
      disableTopInset
      contentContainerStyle={styles.container}
      header={<StyledTitle text={t("new-project.main-title")} />}
      StickyHeaderComponent={() => <SubmitAndReturn onSubmit={logValuyes} />}
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
