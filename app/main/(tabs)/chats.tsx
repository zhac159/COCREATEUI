import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
import { StyledTitle } from "@/common/components/StyledComponents/StyledTitle";
import { useAuthStore } from "@/common/stores/authStore";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { ChatPreviewInfo } from "@/common/types/ChatPreviewInfo";
import { ChatPreview } from "@/components/Main/Tabs/Chats/ChatPreview";
import { Theme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

export default function Chats() {
  const { t } = useTranslation();
  const styles = useThemedStyles(getStyles);

  const chats = useAuthStore((state) => state.auth.chats);

  const firstChat: ChatPreviewInfo = {
    ...chats[0],
    lastMessage:
      "loren ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    lastMessageDate:
      "loren ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  };

  return (
    <ScrollViewWrapper contentContainerStyle={styles.container}>
      <StyledTitle text={t("chats.title")} />
      <ChatPreview chat={firstChat} />
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
