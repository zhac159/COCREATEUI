import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
import { StyledTitle } from "@/common/components/StyledComponents/StyledTitle";
import { useAuthStore } from "@/common/stores/authStore/authStore";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { ChatPreview } from "@/components/Main/Tabs/Chats/ChatPreview";
import { Theme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export default function Chats() {
  const { t } = useTranslation();
  const styles = useThemedStyles(getStyles);

  const chats = useAuthStore((state) => state.auth.chats);

  return (
    <ScrollViewWrapper contentContainerStyle={styles.container}>
      <StyledTitle text={t("chats.title")} />
      {chats.map((chat) => (
        <ChatPreview key={chat.id} chat={chat} />
      ))}
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
