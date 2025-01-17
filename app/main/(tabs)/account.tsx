import {
  usePostApiEnquiryConfirm,
  usePostApiEnquiryCreate,
} from "@/api/endpoints/cocreateApi";
import { AddButton } from "@/common/components/AddButton";
import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
import StyledButton from "@/common/components/StyledComponents/StyledButton";
import { StyledTitle } from "@/common/components/StyledComponents/StyledTitle";
import { useAuthStore } from "@/common/stores/authStore";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { EditAccountAndInfo } from "@/components/Main/Tabs/Account/EditAccountAndInfo";
import { ManageProjects } from "@/components/Main/Tabs/Account/ManageProjects";
import { Theme } from "@react-navigation/native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export default function Account() {
  const { t } = useTranslation();
  const logOut = useAuthStore((state) => state.logOut);
  const styles = useThemedStyles(getStyles);

  const { mutate: createEnquiry } = usePostApiEnquiryCreate();
  const { mutate: acceptEnquiry } = usePostApiEnquiryConfirm();

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
      <StyledButton text="ShortList" onPress={() => {}} />
      <StyledButton text="logout" onPress={logOut} />
      <StyledButton
        text="send Inquiry"
        onPress={() => {
          createEnquiry({
            data: {
              projectRoleId: 15,
              enquiryMessage: "Hello",
            },
          });
        }}
      />
      <StyledButton
        text="accept Inquiry"
        onPress={() => {
          acceptEnquiry({
            data: {
              enquiryId: 6,
            },
          });
        }}
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
