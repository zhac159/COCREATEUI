import { AddButton } from "@/common/components/AddButton";
import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
import { StyledTitle } from "@/common/components/StyledComponents/StyledTitle";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { EditAccountAndInfo } from "@/components/Main/Tabs/Account/EditAccountAndInfo";
import { ManageProjects } from "@/components/Main/Tabs/Account/ManageProjects";
import { Theme } from "@react-navigation/native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export default function Account() {
  const { t } = useTranslation();
  const styles = useThemedStyles(getStyles);
  return (
    <ScrollViewWrapper
      contentContainerStyle={styles.container}
      header={<EditAccountAndInfo style={styles.editAccountAndInfoStyles} />}
    >
      <StyledTitle text={t("account.you-commissioned-projets")} />
      <ManageProjects />
      <AddButton
        text={t("account.new-project")}
        onPress={() => router.push("/main/(forms)/newProject")}
      />
    </ScrollViewWrapper>
  );
}

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 20,
    },
    editAccountAndInfoStyles: {
      alignSelf: "flex-end",
    },
    button: {
      borderRadius: 10,
    },
  });
